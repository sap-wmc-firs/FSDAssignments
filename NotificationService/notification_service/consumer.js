var amqp = require('amqplib/callback_api');

const TRADE_ADDED = {
        channel: 'trade added'
      };

const MARKET_DATA_MODIFIED = {
        channel: 'market data modified'
      };

exports.startConsumers = function(args, io){
    amqp.connect('amqp://localhost:5672', function(err, conn) {
      conn.createChannel(function(err, ch) {
        var ex = 'topic_trade';

        ch.assertExchange(ex, 'topic', {durable: false});

        ch.assertQueue('', {exclusive: true}, function(err, q) {
          console.log(' [*] Waiting for logs. To exit press CTRL+C');

          args.forEach(function(key) {
            ch.bindQueue(q.queue, ex, key);
          });

          ch.consume(q.queue, function(msg) {
            io.in(TRADE_ADDED.channel).emit('trade added', msg.content.toString());  
            console.log("trade queue");  
            console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
          }, {noAck: true});
        });
      });
    
      conn.createChannel(function(err, ch) {
        var ex = 'topic_marketData';
        ch.assertExchange(ex, 'topic', {durable: false});

        ch.assertQueue('', {exclusive: true}, function(err, q) {
          console.log(' [*] Waiting for logs. To exit press CTRL+C');

          args.forEach(function(key) {
            ch.bindQueue(q.queue, ex, key);
          });

          ch.consume(q.queue, function(msg) {
            io.in(MARKET_DATA_MODIFIED.channel).emit('market data modified', msg.content.toString()); 
            console.log("market data queue");  
            console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
          }, {noAck: true});
        });
      });
  });
}
