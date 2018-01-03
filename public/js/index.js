var socket = io();

socket.on('connect', function () {
    console.log('Welcome to the chat app!')


});
socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message){
    var formattedTime = moment(message.createdAt).format('h:mm a')
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
});

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a')
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    })

    $('#messages').append(html)
    // var li = $("<li>");
    // var a = $('<a target="_blank">My Current Location</a>');
    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);
    // $('#messages').append(li)

})

$('#message-form').on('submit', function(e) {
    e.preventDefault();
    var messaageTextBox = $("[name=message]")
    socket.emit('createMessage', {
        from: 'User',
        text: messaageTextBox.val()
    }, function (data) {
        messaageTextBox.val('')
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
