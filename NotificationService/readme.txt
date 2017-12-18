1) Rabit MQ installation - http://www.rabbitmq.com/install-windows.html
   Download ERLANG - http://www.erlang.org/downloads otp_win64_20.1 before installing Rabit MQ
   It will start automatically.

2) Open both consumer & producer in different cmd

Producer :-
=>Market data posted to http://<10.203.102.203>:3000/api/addMarketDataToQueue
=>Trade data posted to http://<10.203.102.203>:3000/api/addTradeToQueue
cd message_broker
npm start


Consumer(Notification service) :-
cd notification_service
npm start