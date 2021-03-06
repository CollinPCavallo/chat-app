var socket = io();

function scrollToBottom () {
    //Selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');
    //Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    };
};

socket.on('connect', function () {
    var params = $.deparam(window.location.search);

    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/'
        } else {
            console.log('No error')
        }
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function (users) {
    var ol = $('<ol>');
    users.forEach(function (user) {
        ol.append($('<li>').text(user));
    })
    $('#users').html(ol);
})

socket.on('newMessage', function (message){
    var formattedTime = moment(message.createdAt).format('h:mm a')
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a')
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    });

    $('#messages').append(html)
    scrollToBottom();
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();
    var messaageTextBox = $("[name=message]")
    socket.emit('createMessage', {
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
