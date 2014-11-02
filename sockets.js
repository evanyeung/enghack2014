var app = require('./app');

var httpServer = require('http').Server(app);
var io = require('socket.io')(httpServer);

var users = {};
//sockets
io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('joinroom', function(username, room){
        socket.room = room;
        socket.join(room);

        if(!users[room]){
            users[room] = [];
        }
        if(users[room].indexOf(username) !== -1){
            console.log('FAILED');
            socket.emit('joinedroom', false);
        }
        else{
            console.log('FINE');
            socket.username = username;
            users[room].push(username);

            io.sockets.in(room).emit('userchange', users[room]);
            socket.emit('joinedroom', true);
        }
    });

    socket.on('senddata', function(instrument, data){
        socket.broadcast.to(socket.room).emit('recievedata', instrument, data);
    });

    socket.on('disconnect', function(){
        console.log(socket.username + ' disconnected');
        if(users[socket.room]){
            var idx = users[socket.room].indexOf(socket.username);
            if(idx != -1)
                users[socket.room].splice(idx, 1);
                io.sockets.in(room).emit('userchange', users[room]);
            if(users[socket.room].length === 0)
                delete users[socket.room];
        }
    });
});

module.exports = httpServer;

