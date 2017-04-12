/**
 * Created by lenovo on 2017/4/10.
 */
var socketIO = {};
var socket_io = require('socket.io');
var redisCache = require('../db/redisCache');

//获取io
socketIO.getSocketIO = function(server){

    var io = socket_io.listen(server);
    var timerCount = {

    };


    io.sockets.on('connection',function(socket){
        console.log('socket io progress connect succeed');
        socket.on('sendMessage', function (data) {
            var message = {
                senderId : data.senderId,
                receiverId : data.receiverId,
                message : data.message,
                date : data.date
            };
            redisCache.saveMessage(message, function (response) {

                response.senderId = data.senderId;
                response.receiverId = data.receiverId;
                response.date = data.date;
                socket.emit('receiveMessage',response);
            });

        });



        socket.on('heartbeat',function (data){
            var userId = data.userId;
            var pushMessage = function () {
                redisCache.getMesage({receiverId:data.userId}, function(result){
                    if(result.result == 0 && result.length>0){
                        var  map=result.data.map(function (item) {
                            item = item.split('#');
                            return {
                                senderId : parseInt(item[0]),
                                receiverId : parseInt(data.userId),
                                date : parseInt(item[1]),
                                message : item[2]
                            }
                        });

                        socket.emit('pushMessage',{data:map});
                        redisCache.on('confirmPushMessage', function (data){
                            if(data.result == 0){
                                redisCache.syncMessage({receiverId:data.userId},function(result){
                                    if(result.result == 0){
                                        console.log('sync message success');
                                        redisCache.removeMessage({receiverId:data.userId}, function(result){
                                            if(result.result == 0){
                                                console.log('remove message success');
                                            }
                                        })
                                    }else{

                                    }
                                })
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
            else if(timerCount[userId].count/10==0){
               pushMessage();
            }
            timerCount[userId].count++;
        })
    })

};

module.exports = socketIO;