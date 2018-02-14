var express = require('express');
var bodyParser = require('body-parser');
var Pusher = require('pusher');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var pusher = new Pusher({ 
  appId: '473070', 
  key: '507bb42eaa134aad7178', 
  secret:  '4c9069ef298a7923e278',
  cluster: 'ap1',
});

app.get('/', function(req, res){
	res.send('all is well...');
});

app.get("/pusher/auth", function(req, res) {
  var query = req.query;
  var socketId = query.socket_id;
  var channel = query.channel_name;
  var callback = query.callback;

  var auth = JSON.stringify(pusher.authenticate(socketId, channel));
  var cb = callback.replace(/\"/g,"") + "(" + auth + ");";

  res.set({
    "Content-Type": "application/javascript"
  });

  res.send(cb);
});

app.post('/pusher/auth', function(req, res) {
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  var auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});

var port = process.env.PORT || 5000;
app.listen(port);