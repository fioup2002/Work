var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');

// var sdk = require('./routes/sdk/command');
var sdk = require("./routes/course.js");
var upload = require("./routes/upload.js");

var app = express();
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', sdk);

const options = {
  target: 'https://teacher-ju.net', // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  pathRewrite: {
    '^/test': '/', // rewrite path
  },
};

// create the proxy (without context)
const exampleProxy = createProxyMiddleware(options);

// mount `exampleProxy` in web server
app.use('/test', exampleProxy);

// app.use(function(req, res, next) {
// 	res.send("1");
// });
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var server = app.listen(8888, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);	
	// SendAndroidGCM();
	// SendAPNS();
});

function SendAndroidGCM()
{
	var value = "";
	var gcm = require('node-gcm'); 
	/*new app*/
	var sender = new gcm.Sender('');
	var message = new gcm.Message({
			data: { message: "Test Android Message" }
	});
	var regTokens = [value];
	sender.send(message, { registrationTokens: regTokens }, function (err, response) {
			if (err) 
				console.log("error: "+err+" response: "+response);
			else 
				console.log("success: "+response.success);
	});
}

function SendAPNS()
{
	var value = "";
	var device1 = "<"+value+">";
	var join = require('path').join
	var pfx = join(__dirname, './notification/IOS_new_APP_KEY.p12');
	var apnagent = require('apnagent');
	var agent  = new apnagent.Agent();
	agent.set('pfx file', pfx);
	var message = 'Test Message';
	console.log(0);
	agent.createMessage().device(device1).alert(
	{
			body: message, 
			'launch-image': 'notif.png'
	}).send();
	agent.connect(function (err) 
	{
		if(err!=undefined)
		{
			console.log(err);
		}
		var env = agent.enabled('sandbox')? 'sandbox': 'production';
		console.log('apnagent [%s] gateway connected', env);
	});
}

module.exports = app;
