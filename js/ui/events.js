function bindKeyboardEvents(){

// ENTER-event on message input field
	$('#msgInput').bind('keypress', function(e) {
		if(e.keyCode==13){
			var msg = $("#msgInput").val().replace(/(<([^>]+)>)/ig,"");
			if(msg != ''){
				SocketClient.sendMessage(msg);
				$("#msgInput").val('');
			}			
		}
	});
	
// ENTER-event on login input field
	$('#userNameInput').bind('keypress', function(e) {
		if(e.keyCode==13){
			if($('#userNameInput').val() != ''){
				ChatController.connect();
			}
		}
	});
	
}
