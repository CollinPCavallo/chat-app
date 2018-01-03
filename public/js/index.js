var socket = io();

socket.on('connect', function () {
    console.log('Welcome to the chat app!')


});
socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message){
    var formattedTime = moment(message.createdAt).format('h:mm a')
    var li = $('<li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`)
    $('#messages').append(li)
});

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a')
    var li = $("<li>");
    var a = $('<a target="_blank">My Current Location</a>');
    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li)

})

$('#message-form').on('submit', function(e) {
    e.preventDefault();
    var messaageTextBox = $("[name=message]")
    socket.emit('createMessage', {
        from: 'User',
        text: messaageTextBox.val()
    }, function (data) {
        messaageTextBox.val('')
        console.log('Got It', data)
    });
});

var locationButton = $("#send-location")

locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported By your brower');
    }

    locationButton.attr('disabled', 'disabled').text('Sending Location...')
    
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Im Right Here!')
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            long: position.coords.longitude
        });

    }, function () {
        locationButton.removeAttr('disabled').text('Im Right Here!')
        alert('Unable to fetch location');
    });

});
