/**
 * Created by bradyzhang on 2016/12/22.
 */
var redis = require('redis');
var client = redis.createClient('6379', '127.0.0.1');

var setPhoneCode = function (phone, code, callback){
    client.set(''+phone, ''+code, function (error, res){
        if(!error){
            callback({
                result : 0,
                data : res
            });
        }else {
            callback({
                result : -1,
                data :error
            });
        }
    });
};

exports.setPhoneCode = setPhoneCode;


var getPhoneCode = function (phone) {

};

exports.getPhoneCode = getPhoneCode;