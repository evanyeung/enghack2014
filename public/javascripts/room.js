var multiplier = 1;
var keymap = {
    49: '261',
    50: '293',
    51: '330',
    52: '350',
    53: '392',
    54: '440',
    55: '494',
    56: '523',
    accidental: Math.pow(2, 1/12),
    octave: 0
};
var keyboardInstrument = 'synth'; //init

//sockets
var socket = io();

var joinRoom = document.getElementById('join');
joinRoom.onclick = function(){
    var username = document.getElementById('username').value;
    if(roomId && username){
        socket.emit('joinroom', username, roomId);
    }
    else{
        alert('Please enter a username');
    }

    return false;
};

socket.on('joinedroom', function(result){
    if(result){
        document.getElementById('sign-in').style.display = 'none';
        document.getElementById('play').style.display = 'block';
    }
    else{
        alert('Sorry, that username is taken');
    }
});

function resetUserColor(node){
    setTimeout(function(){
        node.style.background = '#ffffff';
        node.style.color = '#000000';
    }, 200);
}

function lightUpUser(user){
    //show which user played the note
    var userList = document.getElementById('user-list');
    var childNodes = Array.prototype.slice.call(userList.childNodes);
    for(var i=0; i<childNodes.length; i++){
        if(childNodes[i].innerHTML === user){
            childNodes[i].style.background = '#000000';
            childNodes[i].style.color = '#ffffff';
            resetUserColor(childNodes[i]);
        }
    }
}

function sendData(instrument, pitch){
    pitch = Math.floor(Math.pow(2, keymap.octave)*multiplier*pitch);
    socket.emit('sendnote', instrument, pitch);
    lightUpUser(socket.username);
}

socket.on('recievedata', function(user, instrument, pitch){
    instruments[instrument](pitch);
    lightUpUser(user);
});

socket.on('userchange', function(users){
    var userList = document.getElementById('user-list');
    while(userList.firstChild){
        userList.removeChild(userList.firstChild);
    }
    for(var i=0; i<users.length; i++){
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(users[i]));
        userList.appendChild(li);
    }
});

// interaction
var messages = document.getElementById('messages');
var message = document.getElementById('message-input');
var playButtons = document.getElementsByClassName('play-note');
playButtons = Array.prototype.slice.call(playButtons);

playButtons.map(function(button, idx){
    playButtons[idx].onmousedown = function(){
        var id = button.id;
        var instrument = id.split('-')[1];
        var note = id.split('-')[2];
        sendData(instrument, note);
    };
});

var chooseButtons = document.getElementsByClassName('set-keyboard');
chooseButtons = Array.prototype.slice.call(chooseButtons);

chooseButtons.map(function(button, idx){
    chooseButtons[idx].onclick = function(){
        keyboardInstrument = button.id;
    };
});

var map = [];
document.onkeydown = document.onkeyup = function(e) {
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';

    // v + number
    if( map[86] ){
        multiplier = keymap.accidental;
        console.log(multiplier);
    }
    // c + number
    else if( map[67] ){
        multiplier = 1/keymap.accidental;
    }
    // No tab or space
    else{
        multiplier = 1;
    }

    if(e.type == 'keydown' && e.keyCode === 88){ //x
        keymap.octave += 1;
    }
    else if(e.type == 'keydown' && e.keyCode === 90){ //z
        keymap.octave -= 1;
    }
    else if(e.type == 'keydown' && e.keyCode === 32){ //space
        sendData('kick', 261);
        return false;
    }

    if(e.type == 'keydown' &&  keymap[e.keyCode]){
        sendData(keyboardInstrument, keymap[e.keyCode]);
    }
};
