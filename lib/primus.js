var core = require('./core');
var util = require('util');
var events = require('events');
var Primus = require('primus');

function _Client(socket) {
  this.socket = socket;
  this.uuid = core.uuid();
}
util.inherits(_Client, events.EventEmitter);

_Client.prototype.nemit = function(cmd, args) {
  this.socket.write([cmd, args]);
}

function WebSockets(app) {
  this.app = app;

  var primus = new Primus(app.server, { transformer: 'engine.io' });

  var self = this;
  primus.on('connection', function (spark) {
    var client = new _Client(spark);
    spark.client = client;

    spark.on('data', function(data) {
      client.emit('packet', data[0], data[1]);
      self.app._nemit(client, data[0], data[1]);
    });
    self.app.emit('clientJoined', client);
  });
  primus.on('disconnection', function (spark) {
    var client = spark.client;
    client.emit('left');
    self.app.emit('clientLeft', client);
  });

  this.server = primus;
}

module.exports = WebSockets;
