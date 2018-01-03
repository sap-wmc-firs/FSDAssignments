'use strict'
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoDB = require('./db/mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
var dbInstance=null;
var request = require('request');
const Eureka = require('eureka-js-client').Eureka;

const client = new Eureka({
    // application instance information 
    instance: {
      app: 'metal-price-service',
      hostName: 'localhost',
      ipAddr: '127.0.0.1',
      port: {
        '$': 9898,
        '@enabled': 'true',
      },
      vipAddress: 'metal-price-service',
      statusPageUrl: 'http://localhost:9898/serverhealth',
      dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      },
    },
    eureka: {
      // eureka server host / port 
      host: 'localhost',
      port: 8761,
      servicePath: '/eureka/apps/',
      fetchRegistry: true,
      registerWithEureka: true,
      maxRetries: 2
    },
});

app.set('json space', 2);
app.enable('trust proxy');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var priceRefreshInterval = 5 * 1000; // 30 seconds
var priceBracket = {
    "min" : 1000,
    "max" : 1600
};

var priceDataMap = {

};


app.get('/servicehealth', function (req, res) {
    res.end('healthy...');
});

app.get('/price/all', function (req, res) {
    filterAndProcessCommoditiesPrice(res, null);
});

app.get('/price/:symbol', function (req, res) {
    filterAndProcessCommoditiesPrice(res, req.params.symbol);
});

// REST API ENDPOINTS
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});


http.listen(9898, function () {
    console.log('ref data service started...');
    require('dns').lookup(require('os').hostname(), function (err, add, fam) {
		if(err)	throw err;
        var healthCheckUrl = 'http://'+ add +':9898/serverhealth';  
        console.log(healthCheckUrl)
        client.logger.level('debug');   
        client.start(function(error) {
        console.log('########################################################');
        console.log(JSON.stringify(error) || 'Eureka registration complete');   });
    });
    connectToMongoDbAndProcessData(); 
});




// SOCKET API
io.on('connection', function (socket) {
    socket.on('REFENTITY', function (data) {
        handleRefServiceRequest(null, socket, data.entity, data.symbol,null);
    });
});


// actual request handler
function postUpdateToNotificationService(dataToSend){
    var headers = {
        'User-Agent':       'Super Agent/0.0.1',
        'Content-Type':     'application/x-www-form-urlencoded'
    }
    
    // Configure the request
    var options = {
        url: 'http://localhost:3000/api/addMarketDataToQueue',
        method: 'POST',
        headers: headers,
        form: dataToSend
    }
    
    // Start the request
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            console.log(body)
        }
    })
         
}

function getNewPrice(){
    return Math.floor(Math.random() * (priceBracket.max - priceBracket.min)) + priceBracket.min;
}

function handleRefServiceRequest(res, socket, entity, symbol) {
    console.log('entity symbol - ' + symbol);
    var query = symbol ? {
        symbol
    } : {};

    dbInstance.collection(entity).find(query).toArray(function (err, mongoRes) {
        if (err) {
            console.log(err.stack);
            if (res) {
                res.end('failed to get data from collection');
            } 
            else {
                socket.emit('REFENTITY', {
                    symbol: symbol,
                    error: 'failed to get data from collection'
                });
            }
        } else {
            if (mongoRes.length > 0) {
                var data = JSON.stringify(symbol ? mongoRes[0] : mongoRes);
                console.log(data);
                if (res) {
                    res.end(data);
                } else {
                    socket.emit('REFENTITY', {
                        symbol,
                        entity,
                        data
                    });
                }
            } else {
                if (res) {
                    res.end('{"error: "no record found for entity - ' + entity + ' symbol - ' + symbol + '"}');
                } else {
                    socket.emit('REFENTITY', {
                        symbol: symbol,
                        error: 'no record found for entity - ' + entity + ' symbol - ' + symbol
                    });
                }
            }
        }
    });
}

function filterAndProcessCommoditiesPrice(res, symbol) {
    console.log('entity symbol - ' + symbol);
    var query = symbol ? {
        symbol
    } : {};
    dbInstance.collection('commodities').find(query).toArray(function (err, results) {
        if(err) {
            console.log(err.stack);
            if (res) {
                res.end('failed to get data from collection');
            } 
        } else {
            if (results.length > 0) {
                var index = 0;
                for (;index < results.length; index++) {
                    var rs = results[index];
                    rs.price = getNewPrice();
                }
                
                  var data = JSON.stringify(results);
                  console.log(data);
                  res.header("Access-Control-Allow-Origin", "*");
                  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                  res.end(data);
            } else {
                res.end('failed to get data from collection');
            }
        }

    });
}

function getAllCommoditiesPrice(notifyData) {
    dbInstance.collection('commodities').find().toArray(function (err, results) {
        if (results.length > 0) {
            var index = 0;
            for (;index < results.length; index++) {
                var rs = results[index];
                rs.price = getNewPrice();
            }
            
              var data = JSON.stringify(results);
              console.log(data);
              if(notifyData && notifyData === true) {
                postUpdateToNotificationService(data);
              }
        } else {
           console.log("Metadata not available.");
        }
    });
}


function connectToMongoDbAndProcessData(){
    mongoDB.onConnect(function (err, db, objectId) {
        if (err) {
            console.log(err.stack);
        } else {
            dbInstance = db;
            getAllCommoditiesPrice(true);
            setInterval(function(){
                getAllCommoditiesPrice(true);
            }, priceRefreshInterval);
         }
    });
}

