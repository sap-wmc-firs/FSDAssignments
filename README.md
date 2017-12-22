# FSDAssignment 
## App Metallica

### API Gateway
### Spring-boot with Zuul and consul
Zuul is an edge service that provides dynamic routing, monitoring, resiliency, security, and more. In Metallica app it is being used as a API Gateway along with consul as the service discovery.

This gateway once started registers itself with Consul server whose properties are to be defined in the project. Once done a user can request the routes defined in the same properties file.

Steps to Deploy:-
1) Import this project in Eclipse.
2) Make the changes in properties file as and when required.
3) Start the application from the main file. This service listens in on port 8084 by default.

### Example:-
If a route has been defined as following in the properties file:-

zuul.routes.notificationservice.serviceId=notification-service

Client has to hit:- http://localhost:8084/notificationservice to access the service

### Service registry/discovery
#### Consul
Consul has multiple components, but as a whole, it is a tool for discovering and configuring services in your infrastructure. We are using Consul for service registry/discovery part in Metallica app.

Microservices or clients of Consul can provide a service, such as api or mysql, and other clients can use Consul to discover providers of a given service. Using either DNS or HTTP, applications can easily find the services they depend upon.

Consul can be downloaded from https://www.consul.io/downloads.html

You can read more about Consul's internal architecture here https://www.consul.io/docs/internals/architecture.html

##### Initialize Consul

* Start Consul server
   ```shell
   consul agent -server -bootstrap-expect=1 -data-dir=consul-data -ui -bind=<internal-ip-add> -client 0.0.0.0
   ```
  This is the central service registry server which will allow all microservices to register with their discovery information.
  
* Include consul as dependency in package.json of your node based micro-serivce/api-gateway

  ```javascript
  "dependencies": {
	  "consul": "^0.30.0"
  }
  ```
  
* Initialize consul in your application
  ```javascript
  var consul = require('consul')({
	host: sysIP, //consul server address
	port: 8500 //default 
  });
  ```

##### Service registration 

* Register service in consul (micro-service)
  ```javascript
  consul.agent.service.register({
	name: 'service-name',
	id: 'service-id',
	address: sysIP, //internal ip of the host running the service
	port: port,     //port
	tags: ['backing-services'],
	check: {
		http: 'http://' + sysIP + ':' + port + '/health', //health-check endpoint
		interval: "5s",  //health check iterval
		deregistercriticalserviceafter: '15s'  //deregister threshold
	}
  }, function(err) {
      if (err) throw err;
  });
  ```
  
##### Service discovery  
* Discover service example (api-gateway)
  
  ```javascript
  router.get('/service/:name', function(req, res) {
	console.log("getting list of services...");
	var response = "";
  	consul.agent.service.list(function(err, result) {
		var resObj = result;
		var serviceInstances = [];
		for (var property in resObj) {			
			if (req.params.name == resObj[property].Service) {
				console.log('service found. Adding to array')
				serviceInstances.push(resObj[property]);				
			}
		}
		response = JSON.stringify(halson(serviceInstances[Math.floor(Math.random() * serviceInstances.length)]))
		console.log("JSON.stringfy : ", response);
		if (err) throw err;
		res.status(200);
		res.send(response);
		});
  });

### Trade Service
#### Steps to start the trade service.
1. Go to TradeService/UI
2. npm install
3. npm start

#### Below are the end points exposed.

1. http://localhost:8080/get/trades/all
	It is a get call which will return all the trades data.
	Sample Output: 
	[
		{
			"_id": "5a2f84880382d19ecd67f46a",
			"tradeId": 1,
			"side": "Buy",
			"quantity": 200,
			"price": 20.42,
			"tradeDate": "07-12-2017",
			"status": "NOMINATED",
			"counterParty": "Ipsum",
			"commodity": "LA",
			"location": "BA"
		},
		{
			"_id": "5a2f85974979db1be04f2408",
			"tradeId": 11,
			"side": "Sell",
			"quantity": 200,
			"price": 20.42,
			"tradeDate": "07-12-2017",
			"status": "NOMINATED",
			"counterParty": "Ipsum",
			"commodity": "LA",
			"location": "BA"
		}
	]

2. http://localhost:8080/update/trade
	It is a POST call which will insert/update the trade.
	Sample Input:
	change an existing trade
	{	
		"tradeId": 1,
        "side": "Buy",
        "quantity": 200,
        "price": 20.42,
        "tradeDate": "07-12-2017",
        "status": "NOMINATED",
        "counterParty": "Ipsum",
        "location": "BA",
        "commodity": "LA"
    }
	
	or 
	create a new trade
	{	
        "side": "Buy",
        "quantity": 200,
        "price": 20.42,
        "tradeDate": "07-12-2017",
        "status": "NOMINATED",
        "counterParty": "Ipsum",
        "location": "BA",
        "commodity": "LA"
    }

3. http://localhost:8080/delete/trade
	It is a POST call which will delete an existing trade.
	Sample Input:
	{	
		"tradeId": 2,
        "side": "Sell",
        "quantity": 200,
        "price": 20.42,
        "tradeDate": "07-12-2017",
        "status": "NOMINATED",
        "counterParty": "Ipsum",
        "location": "BA",
        "commodity": "LA"
    }
