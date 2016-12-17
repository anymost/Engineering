var User = require('./Model').User;
var Tool = require('../tools/index');

/**
 * @description 新增用户
 * @param userInfo
 * @param callback
 */
var addUser = function (userInfo, callback){
    if(!userInfo && !callback){
        return;
    }
    User.create({
        userId : Tool.getRandom(),
        userName : userInfo.userName,
        password : userInfo.password,
        phone : userInfo.phone,
        email　: userInfo.email
    }).then(function () {
        callback({
            result : 0,
            message : 'success'
        });
    }, function (error) {
        callback({
            result : -1,
            message : error.name || 'connect error'
        });
    });
};


exports.addUser = addUser;


/**
 * @description 更新用户名
 * @param userInfo
 * @param callback
 */
var updateName = function (userInfo, callback){
    if(!userInfo && !callback){
        return;
    }
    User.update({userName : userInfo.userName},
            {
                where :
                {
                    userId : userInfo.userId
                    }
            })
        .then(function () {
                callback({
                    result : 0,
                    message : 'success'
                });
            },
            function (error) {
                callback({
                    result : -1,
                    message : error.name || 'connect error'
                });
            });
};
exports.updateName = updateName;

/**
 * @description 更新用户密码
 * @param userInfo
 * @param callback
 */
var updatePassword = function (userInfo, callback){
    if(!userInfo && !callback){
        return;
    }
    User.update({password : userInfo.password},
        {
            where :
            {
                userId : userInfo.userId
            }
        })
        .then(function () {
                callback({
                    result : 0,
                    message : 'success'
                });
            },
            function (error) {
                callback({
                    result : -1,
                    message : error.name || 'connect error'
                });
            });
};
exports.updatePassword = updatePassword;

/**
 * @description 更新用户电话
 * @param userInfo
 * @param callback
 */
var updatePhone = function (userInfo, callback){
    if(!userInfo && !callback){
        return;
    }
    User.update({phone : userInfo.phone},
        {
            where :
            {
                userId : userInfo.userId
            }
        })
        .then(function () {
                callback({
                    result : 0,
                    message : 'success'
                });
            },
            function (error) {
                callback({
                    result : -1,
                    message : error.name || 'connect error'
                });
            });
};
exports.updatePhone = updatePhone;


/**
 * @description 更新用户邮件
 * @param userInfo
 * @param callback
 */
var updateEmail = function (userInfo, callback){
    if(!userInfo && !callback){
        return;
    }
    User.update({email : userInfo.email},
        {
            where :
            {
                userId : userInfo.userId
            }
        })
        .then(function () {
                callback({
                    result : 0,
                    message : 'success'
                });
            },
            function (error) {
                callback({
                    result : -1,
                    message : error.name || 'connect error'
                });
            });
};
exports.updateEmail = updateEmail;

