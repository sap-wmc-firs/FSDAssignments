'use script';

const PORT = 3030;

/// setup
var express = require('express');
var socketio = require('socket.io');
var bodyParser = require('body-parser');
var consumer = require('./consumer.js');

var app = express();
var server = app.listen(PORT);
console.log('Magic happens on port ' + PORT);

var io = socketio(server);

var router = express.Router();
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

const TRADE_ADDED = {
        channel: 'trade added'
      };

const MARKET_DATA_MODIFIED = {
        channel: 'trade added'
      };

const NOTIFICATION_TYPE = {
        marketDataModified: MARKET_DATA_MODIFIED,
        tradeAdded: TRADE_ADDED
      };

/// for each client on socket
io.on('connect', function (clientConnection) {

  logger.debug('new socket connection with client id', clientConnection.id);

  clientConnection.on('join channel', function (channelName, callback){
    clientConnection.join(NOTIFICATION_TYPE[channelName].channel, callback("joined " + channelName));
    logger.debug('client', clientConnection.id, 'joined socket channel', NOTIFICATION_TYPE[channelName].channel);
  });

});

var args = ['#'];
consumer.startConsumers(args, io);

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/notify_service', router);
