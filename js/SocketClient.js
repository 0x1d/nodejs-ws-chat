var wssUrl = "ws://frupii.nodechat.jit.su";
var socket;

var cmd = {
	connect: '/connect ',
	disconnect: '/disconnect ',
	broadcast: '/broadcast '
}

var SocketClient = {

	socket: null,

	init: function(user){
	
		socket = new WebSocket(wssUrl);
		
		socket.onopen = function(){
			socket.send(cmd.connect + user);
		};

		socket.onmessage = function (evt) { 
			ChatController.dispatch(evt.data);
		};

		socket.onclose = function() {
		};
		
	},
	
	sendMessage: function(msg){
		socket.send(cmd.broadcast + msg);
	},
	
	close: function(){
		socket.close();
	}
	
	
};
