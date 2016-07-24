/**
 * Created by Edward on 18/07/2016.
 */
var socket = io();
var lastCommandsHTML = [];
socket.on('chat message', function (msg) {
    $('#messages').prepend($('<li class="list-group-item">').text(msg));
    var elem = document.getElementById('messagewindow');
    elem.scrollTop = elem.scrollHeight;
});

socket.on('chat image', function (imageMessageFromSocket) {
    console.log(imageMessageFromSocket);
    var img = new Image();
    img.src = 'data:image/jpeg;base64,' + imageMessageFromSocket.buffer;
    $(img).load(function () {
        console.log("natural width and height: " + img.naturalWidth + " " + img.naturalHeight);
        console.log("img width and height: " + img.width + " " + img.height);
        var newImageSize = changeImageSize(img.width, img.height);
        img.width = newImageSize[0];
        img.height = newImageSize[1];
        console.log(img);
        console.log('Receiving data from server, ie receiving image from the other client (client->server->client)');
        $('#messages').prepend($('<li class="list-group-item"><img src="' + img.src + '" width="' + img.width + '" ' +
            'height="' + img.height + '" >'));
    });
});

socket.on('chat retrieval', function (logChat) {
    console.log(logChat);
    for (var i = 0, len = logChat.length; i < len; i++) {
        console.log(logChat[i]);
        $('#messages').prepend($('<li class="list-group-item">').text(logChat[i]));
    }
});

socket.on('last commands', function (lastCommands) {
    lastCommandsHTML = lastCommands;
    console.log(lastCommandsHTML);
});

socket.on('receive drawing', function(drawObject){
    context.moveTo(drawObject.coordinatesX[0], drawObject.coordinatesY[0]);
    context.beginPath();
    for(var i =1;i<drawObject.coordinatesX.length;i++){
        context.lineTo(drawObject.coordinatesX[i], drawObject.coordinatesY[i]);
        context.stroke();
    }
});
