'use strict'
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoDB = require('./db/mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
var dbInstance=null;
var request = require('request');
var  consul  =  require('consul')({    
    host:   'localhost',
        port:  8500
});

app.set('json space', 2);
app.enable('trust proxy');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



app.get('/servicehealth', function (req, res) {
    res.end('healthy...');
});

// REST ENDPOINTS
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

//locations
app.get('/api/:type', function (req, res) {
    handleRefServiceRequest(res, null, req.params.type, null,null);
});

app.get('/api/:type/:symbol', function (req, res) {
    handleRefServiceRequest(res, null, req.params.type, req.params.symbol.toUpperCase(),null);
});

http.listen(9898, function () {
    console.log('ref data service started...');
    require('dns').lookup(require('os').hostname(), function (err, add, fam) {
        if (err) throw err;
        var healthCheckUrl = 'http://'+ add +':9898/servicehealth';  
        console.log(healthCheckUrl)     
        consul.agent.service.register({
                name: 'metal-price-service',
                id: 'metal-price-service',
            address:add,
            port:8080,
                check: {
                    http: healthCheckUrl,
                    interval: "5s",     
                    deregistercriticalserviceafter: '15s'
                }
            }, function(err) {
                if (err) throw err;
                console.log('service registered with registery...');
            }); 
    }); 
    connectToMongoDb(); 
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
function UpdatePrice(){
    
}
function getDataFromMongoDb(){
    var data=null;
    dbInstance.collection('MetalPrice').find().toArray(function (err, results) {
        if (results.length > 0) {
           data =JSON.stringify(results);
           postUpdateToNotificationService(data);
          }
         
        
});

}
function connectToMongoDb(){
    mongoDB.onConnect(function (err, db, objectId) {
        if (err) {
            console.log(err.stack);
 
            
        } else {
            dbInstance=db;
                       
setInterval(function(){
     getDataFromMongoDb()
    
},1000);
        }
});
}
function handleRefServiceRequest(res, socket, entity, symbol) {
    console.log('entity symbol - ' + symbol);
    var query = symbol ? {
        symbol
    } : {};

    mongoDB.onConnect(function (err, db, objectId) {
        if (err) {
            console.log(err.stack);
            if (res) {
                res.end('failed to connect with mongo db');
            } else {
                socket.emit('REFENTITY', {
                    symbol: symbol,
                    error: 'failed to connect with mongo db'
                });
            }
        } else {
            dbInstance=db;
            db.collection(entity).find(query).toArray(function (err, mongoRes) {
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
    });
}