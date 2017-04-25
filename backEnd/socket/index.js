/**
 * Created by lenovo on 2017/4/10.
 */
var socketIO = {};
var socket_io = require('socket.io');
var redisCache = require('../db/redisCache');


//获取io
socketIO.getSocketIO = function (server){

    var io = socket_io.listen(server);

    /**
     * 心跳系统计数
     * @type {{}}
     */
    var timerCount = {
    };

    /**
     * 同一文档在线人数统计
     * @type {{}}
     */
    var userCount = {

    };
    /**
     * lastDocContent = {
     *  docId : {handlerId:0,content:content}
     * }
     * @type {{}}
     */
    var lastDocContent = {

    };

    io.sockets.on('connection', function (socket){

        /**
         * 处理发送消息
         */
        socket.on('sendMessage', function (data) {
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

        });

        /**
         * 处理清除消息队列
         */
        socket.on('clearMessage', function (data){
            var userId = data.userId;
            delete timerCount[userId];
        });

        /**
         * 处理心跳系统和服务端消息推送
         */
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
        });

        /**
         * 处理多人在线编辑文档时的人数
         */
        socket.on('loadContent', function (data){
            var userId = String(data.userId), documentId = String(data.documentId);
            if(!userCount.hasOwnProperty(documentId)){
                userCount[documentId] = [userId];
            }else{
                var array = userCount[documentId];
                if(array.indexOf(userId) == -1){
                    userCount[documentId].push(userId);
                }
            }
            socket.emit('loadContent', {userCount:userCount[documentId].length});
        });

        /**
         * 处理多人同时编辑文档
         */
        socket.on('editContent', function (data){
           var docId = data.documentId,
               handlerId = data.handlerId,
               content = data.content;
           if(!lastDocContent[docId]){
               lastDocContent[docId] = {
                   handlerId : handlerId,
                   content : content
               };
           }else {
               content = content && lastDocContent[docId].content;
               lastDocContent[docId] = {
                   handlerId : handlerId,
                   content : content
               };
           }
           socket.emit('emitContent', {
               documentId : docId,
               handlerId : handlerId,
               content : content
           });
        });
    });

};

module.exports = socketIO;