const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
var {generateMessage, generateLocationMessage} = require('./utils/message')
const publicPath = path.join(__dirname, '../public' );
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected')

    socket.emit('newMessage', generateMessage('Admin', 'Welcome To the Chat App friend!'));
   
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New Friend is here!'));

    socket.on('createMessage', (message, callback) => {
        console.log(message, 'created message');
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the sever');


    });
    socket.on('createLocationMessage', (cords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', cords.lat, cords.long))
    })
    
    socket.on('disconnect' , () => {
        console.log('client disconnected')
    })
});


server.listen(port, () => {
    console.log(`server is listening on port ${port}`)
});
