var express			= require('express'),
	bodyParser		= require('body-parser'),
	path			= require('path'),
	sassMiddleware 	= require('node-sass-middleware'),
	port			= process.env.PORT || 8000,
	root			= __dirname,
	app				= express();

// scss to css compiler: load before static file location
app.use(
	sassMiddleware({
		src: path.join(root, 'client/static/sass'),
		dest: path.join(root, 'client/static/css'),
		prefix: '/static/css',
		debug: true,
		outputStyle: 'compressed'
	})
);

app.use(express.static(path.join(root, 'client')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// load mongoDB
require('./server/config/mongoose');
// traditional HTTP requests handler
require('./server/config/routes')(app);

var server = app.listen(port, function() {
	console.log(`listening to port ${ port }`);
});

// web socket connection
require('./server/config/sockets')(server);
