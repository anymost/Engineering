/**
 * Created by lenovo on 2017/4/10.
 */
var Message = require('./Model').Message;

/**
 * @description 保存信息
 * @param data
 * @param callback
 */
var saveMessage = function(data, callback){
    var senderId = parseInt(data.senderId),
        receiverId = parseInt(data.receiverId),
        message = data.message,
        date = parseInt(data.date);
    if(senderId && receiverId && message && date){
        Message.create({
            senderId : senderId,
            receiverId : receiverId,
            message : message,
            date    : date
        }).then(function () {

        },function () {
            callback({
                result : 0,
                message : 'success'
            });
        },function (error) {
            callback({
                result : -1,
                message : error.name
            });
        });
    }
};
exports.saveMessage = saveMessage;


/**
 * @description 根据senderId和receiverId获取消息
 * @param data
 * @param callback
 */
var getMessage = function (data, callback) {
   var senderId = data.senderId,
       receiverId = data.receiverId;
   Message.findAll({
       attributes:['date', 'message'],
       where : {
           senderId : senderId,
           receiverId : receiverId
       }
   }).then(function (result) {
        if(result.length<1){
            callback({
                result : -2,
                message : 'message list empty'
            })
        }else{
            var messageList = result.map(function(item){
                return{
                    date : item.dataValues['date'],
                    message : item.dataValues['message']
                }
            });
            callback({
                result : 0,
                message : 'success',
                senderId : senderId,
                receiverId : receiverId,
                messageList : messageList
            });
        }
   },function (error) {
       callback({
           result : -1,
           message : error.name
       })
   })
};

exports.getMesage = getMessage;

