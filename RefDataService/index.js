'use strict'
var express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoDB = require('./db/mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 9998;
const eureka = require('eureka-js-client').Eureka;

app.set('json space', 2);
app.enable('trust proxy');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

var refDataRouter = express.Router();
app.use('/refdata', refDataRouter);

var ntlm = require('express-ntlm');
refDataRouter.use(ntlm());
refDataRouter.use(cors());

refDataRouter.get('/username', function(request, response) {
  //  console.log(request);
  console.log("****"+request.ntlm);  
  response.send(request.ntlm);
});

app.get('/servicehealth', function (req, res) {
    res.end('healthy...');
});

// REST ENDPOINTS
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

//locations
app.get('/entities/:type', function (req, res) {
    handleRefServiceRequest(res, null, req.params.type, null);
});

app.get('/entities/:type/:symbol', function (req, res) {
    handleRefServiceRequest(res, null, req.params.type, req.params.symbol.toUpperCase());
});

http.listen(port, function () {
    console.log('ref data service started...');
    require('dns').lookup(require('os').hostname(), function (err, add, fam) {
        if  (err)  throw  err;
        var healthCheckUrl = 'http://' + add + ':' + port + '/servicehealth';
        console.log(healthCheckUrl)
        const client = new eureka({
            // application instance information 
            instance: {
                app: 'ref-data-service',
                ipAddr: add,
                hostName: require('os').hostname() + '' || 'localhost',
                port: {
                    '$': port,
                    '@enabled': 'true',
                },
                vipAddress: 'ref-data-service',
                statusPageUrl: healthCheckUrl,
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

        client.logger.level('debug');
        client.start(function (error) {
            console.log('########################################################');
            console.log(error ? JSON.stringify(error) : 'Eureka registration complete');
        });
    });
});




// SOCKET API
io.on('connection', function (socket) {
    socket.on('REFENTITY', function (data) {
        handleRefServiceRequest(null, socket, data.entity, data.symbol);
    });
});



// actual request handler

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
            db.collection(entity).find(query).toArray(function (err, mongoRes) {
                if (err) {
                    console.log(err.stack);
                    if (res) {
                        res.end('failed to get data from collection');
                    } else {
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
                            res.header("Access-Control-Allow-Origin", "*");
                            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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