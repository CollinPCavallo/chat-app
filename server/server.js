const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
var {generateMessage} = require('./utils/message')
const publicPath = path.join(__dirname, '../public' );
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected')

    socket.emit('newMessage', generateMessage('Admin', 'Welcome To the Chat App friend!'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New Friend is here!'));

    socket.on('createMessage', (message) => {
        console.log(message, 'created message');
        io.emit('newMessage', generateMessage(message.from, message.text));
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });

    });
    
    socket.on('disconnect' , () => {
        console.log('client disconnected')
    })
});


server.listen(port, () => {
    console.log(`server is listening on port ${port}`)
});
