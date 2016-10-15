module.exports = function(server) {
	var io = require('socket.io').listen(server);

	io.sockets.on('connection', function(socket) {
		console.log("SOCKET CONNECTION IS MADE!");
		console.log(socket.id);

	});

};
