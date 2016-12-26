/**
 * Created by bradyzhang on 2016/12/22.
 */
var redis = require('redis');
var client = redis.createClient('6379', '127.0.0.1');

/**
 * @description 将手机号和对应的验证码存入redis中
 * @param phone
 * @param code
 * @param callback
 */
var setPhoneCode = function (phone, code, callback){
    client.set('' + phone, '' + code, function (error, res){
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


/**
 * @description 通过手机号获取验证码
 * @param phone
 * @param callback
 */
var getPhoneCode = function (phone, callback) {
    client.get('' + phone, function (error, value) {
        if(!error){
            callback({
                result : 0,
                data : value
            });
        }else{
            callback({
                result : -1,
                data :　'not found'
            });
        }
    });
};

exports.getPhoneCode = getPhoneCode;


