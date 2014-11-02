var app = require('./app');

var httpServer = require('http').Server(app);
var io = require('socket.io')(httpServer);

var rooms = ['room1', 'room2'];
var usernames = [];

//sockets
io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('adduser', function(username){
        socket.username = username;
        socket.room = rooms[0];

        //should make sure it is unique later
        usernames.push(username);
        console.log(username);


        socket.join(rooms[0]);

        socket.emit('update', 'SERVER', 'You have connected to ' + rooms[0]);
        socket.broadcast.to(rooms[0]).emit('update', 'SERVER', 'User ' + username + 'has joined.');
    });

    socket.on('senddata', function(data){
        socket.broadcast.to(socket.room).emit('updatechat', socket.username, data);
    });

    socket.on('switchroom', function(room){
        socket.leave(socket.room);
        socket.broadcast.to(socket.room).emit('update', 'SERVER', 'User ' + socket.username + 'has left.');

        socket.join(room);
        socket.room = room;

        socket.emit('update', 'SERVER', 'You have connected to ' + room);
        socket.broadcast.to(room).emit('update', 'SERVER', 'User ' + socket.username + 'has joined.');
        console.log(socket.room);
    });

    socket.on('disconnect', function(){
        console.log('a user disconnected');

        var userIndex = usernames.indexOf(socket.username);
        if (userIndex != -1){
            usernames.splice(userIndex, 1);
        }
    });
});

module.exports = httpServer;
