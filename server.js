var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var self;

var SOCKETS_LIST = {};
var lobby = [];

app.use('/', express.static(__dirname));

io.on('connection', onSocketConnection);

function onSocketConnection(socket){
  SOCKETS_LIST[socket.id] = socket
  console.log(socket.id + " connected");
  self = socket
  socket.on('new player', onNewPlayer);
  socket.on('disconnect', onClientDisconnect);
  socket.on('movement', onPlayerMovement);
  socket.on('bulletShot', function(data){
      console.log("i got to on bullet shot")
      console.log(data.bulletX)
      socket.broadcast.emit('remotePlayerBullet', {id: data.id, x: data.bulletX, y: data.bulletY})
  });
  socket.on('lobby', onLobby);


};



function onPlayerMovement(data){
    var pack = {}
    // console.log("on player movement")
    pack = {
      id: data.id,
      x: data.x,
      y: data.y
    }
    this.broadcast.emit('playerMovement', {id: this.id, x: data.x, y: data.y})
};

function onLobby(data){
  console.log("got onto on lobby")

  lobby.push(data.name)
    console.log(lobby.length)
    // console.log(lobby)
  if(lobby.length === 2){
    self.broadcast.emit('gameStart', {players: [lobby[0], lobby[1], lobby[2], lobby[3]]});
    // self.emit('gameStart', {id: "hello"})
    self.emit('gameStart', {players: [lobby[0], lobby[1], lobby[2], lobby[3]]})
  }
}
function onClientDisconnect(){
  console.log("i got to onClientDisconnect")
  delete SOCKETS_LIST[this.id];
  this.broadcast.emit('remove player', {id: this.id});
};

function onNewPlayer(){
console.log("i got to onNewPlayer")
  for(var socketID in SOCKETS_LIST){
    if(SOCKETS_LIST.hasOwnProperty(socketID)){
      this.emit('new player', {
        id: socketID,
      });
    };
  };

  this.broadcast.emit('new player', {id: this.id});
};

server.listen(3000, function(err){
  console.log("--------listening started---------")
});