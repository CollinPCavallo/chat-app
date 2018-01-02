const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public' );

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected')

    socket.emit('newMessage',{
        from: 'Collin123',
        text: 'Hey whats up',
        createdAt: 123
    });
    
    socket.on('createMessage', (Message) => {
        console.log(Message, 'created message');
    });
    
    socket.on('disconnect' , () => {
        console.log('client disconnected')
    })
});


server.listen(port, () => {
    console.log(`server is listening on port ${port}`)
});
