module.exports = function(server) {
	var io = require('socket.io').listen(server);
	var userCount = 0;

	io.sockets.on('connection', function(socket) {
		console.log("SOCKET CONNECTION IS MADE!");
		console.log(socket.id);

		socket.on('user_online', function(data) {
			userCount++;
			io.emit('users_count', {userCount: userCount});
		});

		socket.on('user_offline', function(data) {
			userCount--;
			socket.broadcast.emit('users_count', {userCount: userCount});
		});

	});
};
