# FSDAssignment 
## App Metallica

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

