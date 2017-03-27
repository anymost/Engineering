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
        userId : userInfo.userId,
        userName : userInfo.userName,
        password : userInfo.password,
        phone : userInfo.phone,
        email　: userInfo.email,
        headPicture : userInfo.headPicture
    }).then(function () {
        callback({
            result : 0,
            message : 'success'
        });
    }, function (error) {
        if(error.name === 'SequelizeUniqueConstraintError') {
            callback({
                result: -1,
                message: 'username is existed'
            });
        }else{
            callback({
                result : -2,
                message : error.name || 'add user failed'
            });
        }
    });
};


exports.addUser = addUser;
/**
 * @description 获取用户信息
 * @param userInfo
 * @param callback
 */
var getUserInfo = function (userInfo,callback){
  if(!userInfo && !callback){
      return;
  }
  User.findAll({
      attributes : ['userName','headPicture'],
      where : {
          userId : userInfo.userId
      }
  }).then(function (result) {
      if(result.length === 0){
          callback({
              result : -2,
              message : 'user not found'
          });
      }else{
          var userName = result[0] && result[0].dataValues && result[0].dataValues['userName'];
          var headPicture = result[0] && result[0].dataValues && result[0].dataValues['headPicture'];
          callback({
              result : 0,
              userName : userName,
              headPicture : headPicture
          })
      }
  }, function (error) {
      callback({
          result : -1,
          message : error.name || 'get user info error'
      });
  })

};

exports.getUserInfo = getUserInfo;

/**
 * @description 验证用户身份
 * @param userInfo
 * @param callback
 */
var verifyUser = function (userInfo, callback){
    if(!userInfo && !callback){
        return;
    }
    User.findAll({
        attributes : ['password','userId','headPicture'],
        where : {
            userName : userInfo.userName
        }
    }).then(function (result) {
        if(result.length === 0){
            callback({
                result : -2,
                message : 'username not found'
            });
        }else{
            var password = result[0] && result[0].dataValues && result[0].dataValues['password'];
            var userId = result[0] && result[0].dataValues && result[0].dataValues['userId'];
            var headPicture = result[0] && result[0].dataValues && result[0].dataValues['headPicture'];

            if(password === userInfo.password){
                callback({
                    result :0,
                    message : 'success',
                    userId : String(userId),
                    userName : userInfo.userName,
                    headPicture : headPicture
                });
            }else {
                callback({
                    result : -3,
                    message : 'password not match'
                });
            }
        }
    },  function (error) {
        callback({
            result : -1,
            message : error.name || 'verify failed'
        });
    });
};


exports.verifyUser = verifyUser;

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

