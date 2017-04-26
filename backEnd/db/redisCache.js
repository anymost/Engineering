/**
 * Created by bradyzhang on 2016/12/22.
 */
var redis = require('redis');
var client = redis.createClient('6379', '127.0.0.1');
var Message = require('./Message');

/**
 * @description 将手机号和对应的验证码存入redis中
 * @param phone
 * @param code
 * @param callback
 */
var setPhoneCode = function (phone, code, callback) {
    client.set('' + phone, '' + code, function (error, res) {
        if (!error) {
            callback({
                result: 0,
                data: res
            });
        } else {
            callback({
                result: -1,
                data: error
            });
        }
    });
};

exports.setPhoneCode = setPhoneCode;


/**
 * @description 通过手机号获取验证码
 * @param phone
 * @param callback
 */
var getPhoneCode = function (phone, callback) {
    client.get('' + phone, function (error, value) {
        if (!error) {
            callback({
                result: 0,
                data: value
            });
        } else {
            callback({
                result: -1,
                data: 'not found'
            });
        }
    });
};

exports.getPhoneCode = getPhoneCode;
/**
 * @description 在缓存中保存用户发送的消息
 * @param data
 * @param callback
 */
var saveMessage = function (data, callback) {
    var senderId = data.senderId,
        senderName = data.senderName,
        receiverId = data.receiverId,
        message = data.message,
        date = data.date;
    var listKey = receiverId;
    var data = senderId + '#' + date + '#' + message + '#' + senderName;
    client.rpush(listKey, data, function (error, result) {
        if (!error) {
            callback({
                result: 0,
                message: result
            });
        } else {
            callback({
                result: -1,
                message: error
            });
        }
    });
};
exports.saveMessage = saveMessage;

/**
 * @description 通过receiverId获取消息
 * @param info
 * @param callback
 */
var getMessage = function (info, callback) {
    var receiverId = String(info.receiverId);
    client.llen(receiverId, function (error, listLength) {
        if (error) {
            callback({
                result: -1,
                message: 'get list length error'
            });
        } else {
            client.lrange(receiverId, 0, parseInt(listLength) - 1, function (error, result) {
                if (!error) {
                    callback({
                        result: 0,
                        data: result,
                        message: 'success',
                        length: listLength
                    });
                } else {
                    callback({
                        result: -2,
                        message: error
                    });
                }
            });
        }

    });

};

exports.getMesage = getMessage;

/**
 * @description 通过receiverId删除消息
 * @param info
 * @param callback
 */
var removeMessage = function (info, callback) {
    var receiverId = String(info.receiverId);
    client.ltrim(receiverId, 1, 0, function (error, result) {
        if (!error) {
            callback({
                result: 0,
                message: 'success'
            });
        } else {
            callback({
                result: -1,
                message: error
            });
        }
    });
};
exports.removeMessage = removeMessage;

/**
 * @description mysql和redis之间同步消息
 * @param info
 * @param callback
 */
var syncMessage = function (info, callback) {
    var receiverId = String(info.receiverId);
    client.llen(receiverId, function (error, listLength) {
        if (error) {
            callback({
                result: -1,
                message: 'get list length error'
            });
        } else {
            client.lrange(receiverId, 0, parseInt(listLength) - 1, function (error, result) {
                if (!error) {
                    Array(result.data).forEach(function (item) {
                        if (item) {
                            item = item.split('#');
                            Mesage.saveMessage({
                                senderId: parseInt(item[0]),
                                receiverId: parseInt(receiverId),
                                date: parseInt(item[1]),
                                message: item[2],
                                senderName : item[3]
                            });
                        }
                    });
                    callback({
                        result: 0,
                        message: 'success'
                    });
                } else {
                    callback({
                        result: -2,
                        message: error
                    });
                }
            });
        }

    });

};
exports.syncMessage = syncMessage;


var saveContent = function (data, callback){
    var documentId = data.documentId,
        content = data.content,
        handlerId = data.handlerId;
    client.save
}
