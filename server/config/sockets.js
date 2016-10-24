module.exports = function(server) {
	var io = require('socket.io').listen(server);
	var userCount = 0;
	var sc2_games = [];

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

		socket.on('sc2_newGame', function(data) {
			var socket_id = socket.id;
			for (var i = 0; i < sc2_games.length; i++) {
				if (socket_id == sc2_games[i].socket_id) {
					sc2_games.splice(i, 1); // erase before adding a newGame
					break;
				}
			}
			data.socket_id = socket_id;
			sc2_games.push(data);
			console.log(sc2_games);
		});
	});
};
