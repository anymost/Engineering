/**
 * Created by lenovo on 2017/4/10.
 */
var socketIO = {};
var socket_io = require('socket.io');

//获取io
socketIO.getSocketIO = function(server){

    var io = socket_io.listen(server);
    io.sockets.on('connection',function(socket){
        console.log('socket io progress connect succeed');
        socket.on('sendMessage', function (data) {
            socket.emit('receiveMessage',{});
        });
        socket.emit('pushMessage',{});
    })

};

module.exports = socketIO;