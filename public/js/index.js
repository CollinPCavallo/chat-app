var socket = io();

socket.on('connect', function () {
    console.log('Welcome to the chat app!')


});
socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message){
    console.log('New Message' ,message)
});
