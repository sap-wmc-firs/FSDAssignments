'use strict'
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoDB = require('./db/mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

var  consul  =  require('consul')({    
    host:   '127.0.0.1',
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
app.get('/entities/:type', function (req, res) {
    handleRefServiceRequest(res, null, req.params.type, null);
});

app.get('/entities/:type/:symbol', function (req, res) {
    handleRefServiceRequest(res, null, req.params.type, req.params.symbol.toUpperCase());
});

http.listen(9998, function () {
    console.log('ref data service started...');
    require('dns').lookup(require('os').hostname(), function (err, add, fam) {
        if (err) throw err;
        var healthCheckUrl = 'http://'+ add +':9998/servicehealth';  
        console.log(healthCheckUrl)     
        consul.agent.service.register({
                name: 'ref-data-service',
                id: 'ref-data-service',
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