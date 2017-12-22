// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var producer = require('./producer.js');
var consul = require('consul') ({
	host: 'localhost',
	port: 8500
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
app.use('/api', router);

// Register to Consul
consul.agent.service.register({
	name: 'producer-service',
	id: 'producer-service',
	address: 'localhost', //internal ip of the host running the service
	port: 3000,     //port
	check: {
		http: 'http://localhost:3000/api/health', //health-check endpoint
		interval: "5s",  //health check iterval
		deregistercriticalserviceafter: '15s'  //deregister threshold
	}
  }, function(err) {
      if (err) throw err;
  });