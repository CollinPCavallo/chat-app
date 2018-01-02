var socket = io();

socket.on('connect', function () {
    console.log('Welcome to the chat app!')

    socket.emit('createMessage', {
        from: 'David@example.com',
        text: 'Not Much man how are you?'
    })
});
socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message){
    console.log('New Message' ,message)
});
