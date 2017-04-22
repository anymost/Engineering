/**
 * Created by lenovo on 2017/4/22.
 */

var redisCache = require('../db/redisCache');

var sendMessage = function (socket) {
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
};
exports.sendMessage = sendMessage;