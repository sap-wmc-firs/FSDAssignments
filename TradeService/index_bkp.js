const express = require("express");
const http = require('http').Server(express);
const io = require('socket.io')(http);
const mongoDB = require('./db/mongodb');
const bodyParser = require('body-parser');

var consul = require('consul')({
    host: '10.207.101.204',
    port: 8500
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
app.get('/get/trades/all', function (req, res) {
    getAllTradesServiceRequest(res, null);
});

app.post('/update/trade', function (req, res) {
    updateTradeServiceRequest(res, null, req.body);
});

http.listen(8080, function () {
    console.log('trade data service started...');
    /*require('dns').lookup(require('os').hostname(), function (err, add, fam) {
		if(err)	throw err;
        var healthCheckUrl = 'http://'+ add +':8080/servicehealth';  
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
			if (err) throw err;
				console.log('service registered with registery...');
			}); 
    });   */ 
});


// SOCKET API
io.on('connection', function (socket) {
    socket.on('ALLTRADES', function (data) {
        getAllTradesServiceRequest(null, socket);
    });
	socket.on('UPDATETRADE', function (data) {
        getAllTradesServiceRequest(null, socket, data);
    });
});

// actual request handlers
function getAllTradesServiceRequest(res, socket) {
	//TODO
}

function updateTradeServiceRequest(res, socket, req) {
	//TODO
}
