/**
 * Created by lenovo on 2017/4/10.
 */
var socketIO = {};
var socket_io = require('socket.io');
var redisCache = require('../db/redisCache');
var sendMessage = require('./sendMessage').sendMessage;
var serverPushMessaage = require('./serverPushMessage').serverPushMessage;

//获取io
socketIO.getSocketIO = function (server){

    var io = socket_io.listen(server);
    var timerCount = {

    };

    io.sockets.on('connection', function (socket){
        /*socket.on('sendMessage', function (data) {
            var message = {
                senderId : data.senderId,
                senderName : data.senderName,
                receiverId : data.receiverId,
                message : data.message,
                date : data.date
            };
            redisCache.saveMessage(message, function (response) {

                response.senderId = data.senderId;
                response.receiverId = data.receiverId;
                response.date = data.date;
                response.senderName = data.senderName;
                socket.emit('receiveMessage', response);
            });

        });*/


        /*socket.on('clearMessage', function (data){
            var userId = data.userId;
            delete timerCount[userId];
        });
        socket.on('heartbeat', function (data){
            var userId = data.userId;

            var pushMessage = function () {
                redisCache.getMesage({receiverId:data.userId}, function (result){
                    if(result.result == 0 && result.length > 0){
                        var  map = result.data.map(function (item) {
                            item = item.split('#');
                            return {
                                senderId : parseInt(item[0]),
                                receiverId : parseInt(data.userId),
                                senderName : item[3],
                                date : parseInt(item[1]),
                                message : item[2]
                            };
                        });
                        socket.emit('pushMessage', {data:map});
                        socket.on('confirmPushMessage', function (data){
                            if(data.result == 0){
                                redisCache.syncMessage({receiverId:data.userId}, function (result){
                                    if(result.result == 0){
                                        setTimeout(function () {
                                            redisCache.removeMessage({receiverId: data.userId}, function (result) {
                                                if (result.result == 0) {
                                                    console.log('remove message success');
                                                }
                                            });
                                        }, 10000);
                                    }else{

                                    }
                                });
                            }
                        });
                    }
                });
            };
            if(!timerCount[userId]){
                timerCount[userId] = {
                    count : 0
                };

                pushMessage();

            }
            else if(timerCount[userId].count % 10 == 0){
               pushMessage();
            }
            timerCount[userId].count++;
        });*/

        sendMessage(socket);
        serverPushMessaage(socket, timerCount);
    });

};

module.exports = socketIO;