var util = require('util');
var events = require('events');
var core = require('./core');

function _Room(parent, id) {
  this.parent = parent;
  this.id = id;
  this.uuid = core.uuid();
  this.clients = [];

  var self = this;
  this.packetHandler = function(cmd, args) {
    self.parent._nemit(self, this, cmd, args);
  }
  this.leftHandler = function() {
    self.removeClient(this);
  };
}

_Room.prototype.addClient = function(client) {
  this.clients.push(client);
  client.room = this;

  client.addListener('packet', this.packetHandler);
  client.addListener('left', this.leftHandler);

  this.parent.emit('clientJoined', this, client);
};

_Room.prototype.removeClient = function(client) {
  var clientIdx = this.clients.indexOf(client);
  if (clientIdx < 0) {
    return;
  }
  this.clients.splice(clientIdx, 1);

  client.removeListener('packet', this.packetHandler);
  client.removeListener('left', this.leftHandler);

  this.parent.emit('clientLeft', this, client);
};

_Room.prototype.nemit = function(exceptClient, cmd, args) {
  if (typeof exceptClient === 'string') {
    args = cmd;
    cmd = exceptClient;
    exceptClient = null;
  }

  for (var i = 0; i < this.clients.length; ++i) {
    if (this.clients[i] === exceptClient) {
      continue;
    }
    this.clients[i].nemit(cmd, args);
  }
};

function Rooms(app) {
  this.app = app;
  this.rooms = [];
  this.onMap = {};
}
util.inherits(Rooms, events.EventEmitter);

Rooms.prototype.createRoom = function(id) {
  var newRoom = new _Room(this, id);
  this.rooms.push(newRoom);
  return newRoom;
};

Rooms.prototype.findRoom = function(id) {
  for (var i = 0; i < this.rooms.length; ++i) {
    if (this.rooms[i].id === id) {
      return this.rooms[i];
    }
  }
  return null;
};

Rooms.prototype._nemit = function(room, client, cmd, args) {
  var handlers = this.onMap[cmd];
  if (handlers) {
    for (var i = 0; i < handlers.length; ++i) {
      handlers[i](room, client, cmd, args);
    }
  }
};

Rooms.prototype.non = function(cmd, handler) {
  if (!this.onMap[cmd]) {
    this.onMap[cmd] = [];
  }
  this.onMap[cmd].push(handler);
};

module.exports = Rooms;