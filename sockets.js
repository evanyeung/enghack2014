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
            socket.emit('joinedroom', false);
        }
        else{
            socket.username = username;
            users[room].push(username);

            io.sockets.in(room).emit('userchange', users[room]);
            socket.emit('joinedroom', true);
        }
    });

    socket.on('sendnote', function(instrument, pitch){
        io.sockets.in(socket.room).emit('recievedata', socket.username, instrument, pitch);
    });

    socket.on('disconnect', function(){
        console.log(socket.username + ' disconnected');
        if(users[socket.room]){
            var idx = users[socket.room].indexOf(socket.username);
            if(idx != -1)
                users[socket.room].splice(idx, 1);
                io.sockets.in(socket.room).emit('userchange', users[socket.room]);
            if(users[socket.room].length === 0)
                delete users[socket.room];
        }
    });
});

module.exports = httpServer;

