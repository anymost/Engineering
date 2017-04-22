/**
 * Created by lenovo on 2017/4/22.
 */

var redisCache = require('../db/redisCache');

var serverPushMessage = function (socket, timerCount) {

    socket.on('clearMessage', function (data) {
        var userId = data.userId;
        delete timerCount[userId];
    });
    socket.on('heartbeat', function (data) {
        var userId = data.userId;

        var pushMessage = function () {
            redisCache.getMesage({receiverId: data.userId}, function (result) {
                if (result.result == 0 && result.length > 0) {
                    var map = result.data.map(function (item) {
                        item = item.split('#');
                        return {
                            senderId: parseInt(item[0]),
                            receiverId: parseInt(data.userId),
                            senderName: item[3],
                            date: parseInt(item[1]),
                            message: item[2]
                        };
                    });
                    socket.emit('pushMessage', {data: map});
                    socket.on('confirmPushMessage', function (data) {
                        if (data.result == 0) {
                            redisCache.syncMessage({receiverId: data.userId}, function (result) {
                                if (result.result == 0) {
                                    setTimeout(function () {
                                        redisCache.removeMessage({receiverId: data.userId}, function (result) {
                                            if (result.result == 0) {
                                                console.log('remove message success');
                                            }
                                        });
                                    }, 10000);
                                } else {

                                }
                            });
                        }
                    });
                }
            });
        };
        if (!timerCount[userId]) {
            timerCount[userId] = {
                count: 0
            };

            pushMessage();

        } else if (timerCount[userId].count % 10 == 0) {
            pushMessage();
        }
        timerCount[userId].count++;
    });
};
exports.serverPushMessage = serverPushMessage;