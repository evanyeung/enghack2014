var app = require('./app');

var httpServer = require('http').Server(app);
var io = require('socket.io')(httpServer);

//sockets
io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('joinroom', function(username, roomId){
        socket.username = username;
        socket.room = roomId;
        socket.join(roomId);
    });

    socket.on('senddata', function(data){
        socket.broadcast.to(socket.room).emit('recievedata', socket.username, data);
    });

    socket.on('disconnect', function(){
        console.log(socket.username + ' disconnected');
    });
});

module.exports = httpServer;

