var ChatController = {

	connect: function(){
		var user = $("#userNameInput").val();
		if(user != ''){
			$('#loginPanel').dialog('close');
			$('#chatPanel').dialog('open');
			$("#msgInput").focus();
			SocketClient.init(user);
		}
	},
	
	disconnect: function (){
		SocketClient.close();
		this.resetUI();
	},
	
	resetUI: function (){
		$('#messages').html('');
		$("#loginPanel").dialog('open');
		$('#chatPanel').dialog('close');
	},
	
	dispatch: function (message){

		var cmd = '';
		var param = '';
		
		if(message.indexOf('/') === 0){
			cmd = message.split(' ')[0];
			param = message.split(' ')[1];

		}

		switch(cmd){
			case '/updateUserList': 
				$("#users").html('');
				$("#users").append(param.replaceAll(',','<br/>', true));			
				break;
			default:
				message = replaceURLWithHTMLLinks(message);
				$('#messages').append("("+new Date().toLocaleTimeString()+") "+message+"<br/>");
				$('#messages').stop().animate({ scrollTop: $("#messages")[0].scrollHeight }, 800);
				break;
		}
	}
};


