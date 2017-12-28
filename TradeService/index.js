'use strict'
const app = require("express")();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoDB = require('./db/mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');

var consul = require('consul') ({
	host: '10.207.100.70',
	port: 8500
});

app.set('json space', 2);
app.enable('trust proxy');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/serverhealth', function(req, res) {
	res.end('healthy...');
});

//REST ENDPOINTS

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

//locations
app.get('/get/trades/all', function(req, res) {
	console.log("readed node.");
	getAllTradesServiceRequest(res, null);
});

app.post('/update/trade', function(req, res){
	console.log("in update");
	updateTradeServiceRequest(res, null, req.body);
});

app.post('/delete/trade', function(req, res){
	deleteTradeServiceRequest(res, null, req.body);
});

http.listen(8999, function() {
	console.log('trade data service started...');
	require('dns').lookup(require('os').hostname(), function (err, add, fam) {
		if(err)	throw err;
        var healthCheckUrl = 'http://'+ add +':8080/serverhealth';  
        console.log(healthCheckUrl)
        consul.agent.service.register({
            name: 'trade-data-service',
            id: 'trade-data-service',
            check:{
				http: healthCheckUrl,
				interval: "5s",
				deregistercriticalserviceafter: '15s'
            }
		}, function(err) {
			if (err) {
				console.log(err);
				//throw err;
			}
			else {
				console.log('service registered with registery...');
			}			
			}); 
    });
});

// SOCKET API
io.on('connection', function (socket) {
    socket.on('ALLTRADES', function (data) {
        getAllTradesServiceRequest(null, socket);
    });
	socket.on('UPDATETRADE', function (data) {
        updateTradeServiceRequest(null, socket, data);
    });
	socket.on('DELETETRADE', function (data) {
        deleteTradeServiceRequest(null, socket, data);
    });
});

// actual request handlers
function getAllTradesServiceRequest(res, socket) {
    mongoDB.onConnect(function (err, db, objectId) {
        if (err) {
            console.log(err.stack);
            if (res) {
                res.end('failed to connect with mongo db');
            } else {
                socket.emit('ALLTRADES', {
                    error: 'failed to connect with mongo db'
                });
            }
        } else {
            db.collection('trades').find({}, {_id:0}).toArray(function (err, mongoRes) {
                if (err) {
                    console.log(err.stack);
                    if (res) {
                        res.end('failed to get data from collection');
                    } else {
                        socket.emit('ALLTRADES', {
                            error: 'failed to get data from collection'
                        });
                    }
                } else {
                    if (mongoRes.length > 0) {
                        var data = JSON.stringify(mongoRes);
                        console.log(data);
						sendDataToNotificationService(data);
                        if (res) {
                            res.end(data);
                        } else {
                            socket.emit('ALLTRADES', {
                                data
                            });
                        }
                    } else {
                        if (res) {
                            res.end('{"error: "no trade record found"}');
                        } else {
                            socket.emit('ALLTRADES', {
                                error: '{"error: "no trade record found"}'
                            });
                        }
                    }
                }
            });
        }
    });
}

function updateTradeServiceRequest(res, socket, req) {
	if (req!==undefined && req!==null) {
		var side = req.side;
		if (side===undefined || side===null) {
			side = "";
		}
		var quantity = req.quantity;
		if (quantity===undefined || quantity===null) {
			quantity = "";
		}
		var price = req.price;
		if (price===undefined || price===null) {
			price = "";
		}
		var tradeDate = req.tradeDate;
		if (tradeDate===undefined || tradeDate===null) {
			tradeDate = "";
		}
		var status = req.status;
		if (status===undefined || status===null) {
			status = "";
		}
		var counterParty = req.counterParty;
		if (counterParty===undefined || counterParty===null) {
			counterParty = "";
		}
		var commodity = req.commodity;
		if (commodity===undefined || commodity===null) {
			commodity = "";
		}
		var location = req.location;
		if (location===undefined || location===null) {
			location = "";
		}
		if(req.tradeId===undefined || req.tradeId===null) {
			//new insert
			mongoDB.onConnect(function (err, db, objectId) {
				if (err) {
					console.log(err.stack);
					if (res) {
						res.end('failed to connect with mongo db');
					} else {
						socket.emit('UPDATETRADE', {
							error: 'failed to connect with mongo db'
						});
					}
				}
				else {
					var message;
					var tradeId;
					db.collection("counters").findAndModify(
						{ counterId: 'tradeId' },
						[['_id','asc']],  // sort order
						{ $inc: { seq: 1 } },
						{ upsert: true, new: true },
						function (err, output) {
						if(err){
							message=err;
							db.close();
						}else{
							tradeId = output.value.seq;
							var obj = {
								 tradeId: tradeId,
								 side: side,
								 quantity: quantity,
								 price: price,
								 tradeDate: tradeDate,
								 status: status,
								 counterParty: counterParty,
								 commodity: commodity,
								 location: location
							};
							db.collection("trades").insert(obj, function(err, res) {
								if (err) {
									message = err;
								}
								else {
									message = "trade inserted."
								}
								db.close();
							});
							sendDataToNotificationService(obj);
						}
					});			
					if (res) {
						res.end(message);
					} else {
						socket.emit('ALLTRADES', {
							message
						});
					}					
				}
			});
		}
		else {
			//old update
			mongoDB.onConnect(function (err, db, objectId) {
				if (err) {
					if (res) {
						res.end('failed to connect with mongo db');
					} else {
						socket.emit('UPDATETRADE', {
							error: 'failed to connect with mongo db'
						});
					}
				}
				else {
					var obj = {
						 tradeId: req.tradeId,
						 side: side,
						 quantity: quantity,
						 price: price,
						 tradeDate: tradeDate,
						 status: status,
						 counterParty: counterParty,
						 commodity: commodity,
						 location: location
					};
					db.collection("trades").update(
					   { tradeId: req.tradeId},
							obj
					)
					var successMessage = "trade updated.";
					sendDataToNotificationService(obj);
					if (res) {
                        res.end(successMessage);
                    } else {
                        socket.emit('UPDATETRADE', {
                            successMessage
                        });
                    }
				}
			});
		}
	}
	else {
		if (res) {
            res.end('Invalid Request.');
        } else {
			socket.emit('UPDATETRADE', {
				error: 'Invalid Request.'
			});
		}
	}
}

function sendDataToNotificationService(obj) {
	var options = {
		url : "http://localhost:3000/api/addTradeToQueue",
		method : 'POST',
		json : obj
	};
	console.log("sending request to notification now.");
	request(options, function(error, response, body) {
		console.log(error);
		console.log(response);
		console.log(body);
	});
}

function deleteTradeServiceRequest(res, socket, req) {
	//TODO
	if (req!==undefined && req!==null) {
		mongoDB.onConnect(function (err, db, objectId) {
			if (err) {
				if (res) {
					res.end('failed to connect with mongo db');
					} else {
					socket.emit('DELETETRADE', {
						error: 'failed to connect with mongo db'
					});
				}
			}
			else {
				db.collection("trades").remove({ tradeId : req.tradeId });
				var successMessage = "deleted trade";
				if (res) {
					res.end(successMessage);
				} 
				else {
					socket.emit('DELETETRADE', {
						successMessage
					});
				}
			}
		});
	}
	else {
		if (res) {
            res.end('Invalid Request.');
        } else {
			socket.emit('DELETETRADE', {
				error: 'Invalid Request.'
			});
		}
	}
}