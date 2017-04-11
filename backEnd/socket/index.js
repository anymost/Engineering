/**
 * Created by lenovo on 2017/4/10.
 */
var socketIO = {};
var socket_io = require('socket.io');
var redisCache = require('../db/redisCache');

//获取io
socketIO.getSocketIO = function(server){

    var io = socket_io.listen(server);
    io.sockets.on('connection',function(socket){
        console.log('socket io progress connect succeed');
        socket.on('sendMessage', function (data) {
            var message = {
                sernderId : data.senderId,
                receiverId : data.receiverId,
                message : data.message,
                date : data.date
            };
            console.log('get message ok');
            redisCache.saveMessage(message, function (response) {

                response.senderId = data.senderId;
                response.receiverId = data.receiverId;
                response.date = data.date;
                socket.emit('receiveMessage',response);
                console.log('send message ok');
            });

        });
        socket.emit('pushMessage',{});
    })

};

module.exports = socketIO;