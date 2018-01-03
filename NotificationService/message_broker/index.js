// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var producer = require('./producer.js');
const Eureka = require('eureka-js-client').Eureka;

const client = new Eureka({
    // application instance information 
    instance: {
      app: 'producer-client',
      hostName: 'localhost',
      ipAddr: '127.0.0.1',
      port: {
        '$': 3000,
        '@enabled': 'true',
      },
      vipAddress: 'producer-client',
      statusPageUrl: 'http://localhost:3000/api/health',
      dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      },
    },
    eureka: {
      // eureka server host / port 
      host: '127.0.0.1',
      port: 8761,
      servicePath: '/eureka/apps/',
      fetchRegistry: true,
      registerWithEureka: true,
      maxRetries: 2
    },
});

client.logger.level('debug');   
client.start(function(error) {
    console.log('###############');
    console.log(JSON.stringify(error) || 'Eureka registration complete');   
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.get('/health', function(req, res) {
    res.sendStatus(200);
});

router.post('/addTradeToQueue', function(req, res){
    console.log(req.body);
    var tradeDetails = req.body;
    producer.addMessage('trade', tradeDetails);
    res.json("added");
});

router.post('/addMarketDataToQueue', function(req, res){
    var tradeDetails = req.body;
    producer.addMessage('marketData', tradeDetails);
    res.json("added");
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/producer', router);