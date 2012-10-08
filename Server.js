var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({host:'0.0.0.0',port: 8082});

var chat = {
	clients: new Array(),
	
	run: function(){
		wss.on('connection', function(ws) {

			ws.on('message', function(message) {
				console.log('received: %s', message);
				chat.dispatch(ws, message);
			});
			
			ws.on('close', function() {
				chat.removeClient(ws);
				chat.updateUserListOnClients();
			});
		});
	
	},
	
	removeClient: function(ws){
		for(i = 0; i < chat.clients.length; i++){
			if(chat.clients[i].socket === ws){
				chat.clients.splice(i,1);
				console.log('remove client');
			}
		}
	},
	
	registerClient: function(ws, client){
		var client = { socket : ws, name : client};
		chat.clients.push(client);
		chat.updateUserListOnClients();
	},
	
	broadcast: function(message, fromSocket){
		var user = chat.getClientName(fromSocket);
		chat.broadcastCommand(user+': '+message);
	},

	updateUserListOnClients: function(){
		var userList = new Array();
		for(i = 0; i < chat.clients.length; i++){
			userList.push(chat.clients[i].name);
		}
		console.log(userList.concat());
		chat.broadcastCommand('/updateUserList '+userList.concat());
	},
	
	broadcastCommand: function(cmd){
		for(i = 0; i < chat.clients.length; i++){
			try{		
				chat.clients[i].socket.send(cmd);
			} catch(error){
				chat.clients.splice(i,1);
				console.log(error);
			}
			
		}
	},
	
	getClientName: function(ws){
		for(i = 0; i < chat.clients.length; i++){
			if(chat.clients[i].socket === ws){
				return chat.clients[i].name;
			}
		}
	},
	
	dispatch: function(ws, message){
	
		var cmd = '';
		var param = '';

		if(message.indexOf('/') === 0){
			cmd = message.split(' ')[0];
			param = message.replace(cmd, '');

		}

		switch(cmd){
			case '/broadcast': 
				chat.broadcast(param, ws);
				break;
			case '/connect':
				var msg = param.replace(' ','').replace(/(<([^>]+)>)/ig,"");
				if(msg != ''){
					chat.registerClient(ws, msg);
				}
				break;
		}
		
	}

}

chat.run();









