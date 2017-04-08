var User = require('./Model').User;
var Group = require('./Model').Group;
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
 * @description 搜索用户信息
 * @param userInfo
 * @param callback
 */
var searchFriend = function (userInfo, callback){
    if(!userInfo && !callback){
        return;
    }
    User.findAll({
        attributes : ['userId','userName', 'headPicture'],
        where : {
            userName : userInfo.userName
        }
    }).then(function (result) {
        if(result.length === 0){
            callback({
                result : -2,
                message : 'user not found'
            });
        }else{
            var userId = result[0] && result[0].dataValues && result[0].dataValues['userId'];
            var userName = result[0] && result[0].dataValues && result[0].dataValues['userName'];
            var headPicture = result[0] && result[0].dataValues && result[0].dataValues['headPicture'];
            callback({
                result : 0,
                userId : userId,
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
exports.searchFriend = searchFriend;

/**
 * @description 添加好友
 * @param userInfo
 * @param callback
 */
var addFriend = function (userInfo, callback){
    if(!userInfo || !callback){
        return ;
    }
    var userId = userInfo.userId, friendId = userInfo.friendId;
    User.findAll({
        attributes : ['friends'],
        where : {
            userId : userId
        }
    }).then(function (result) {
        if(result.length === 0){
            callback({
                result : -2,
                message : 'user not found'
            });
        }else{
            var friends = result[0] && result[0].dataValues && result[0].dataValues['friends'];

            if(friends){
                if(friends.indexOf(friendId)!==-1){
                    callback({
                        result : -3,
                        message : 'friend exist'
                    });

                    return;
                }else{
                    friends = friends+'#'+friendId;
                }
            }else{
                friends = friendId;
            }

            User.update({friends : friends},
                {
                    where :
                        {
                            userId : userId
                        }
                }).then(function () {
                    User.findAll({
                        attributes : ['friends'],
                        where : {
                            userId : friendId
                        }
                    }).then(function (result) {
                        var friends = result[0] && result[0].dataValues && result[0].dataValues['friends'];

                        if(friends){
                            friends = friends+'#'+userId;

                        }else{
                            friends = userId;
                        }

                        User.update({friends : friends},
                            {
                                where :
                                    {
                                        userId : friendId
                                    }
                            }).then(function(){
                                callback({
                                    result : 0,
                                    message : 'success'
                                });
                        }, function(error){
                                callback({
                                    result : -5,
                                    message : error.name || 'add friend failed'
                                });
                        })
                    })
                },
                function (error) {
                    callback({
                        result : -4,
                        message : error.name || 'addFriend error'
                    });
                })

        }
    }, function (error) {
        callback({
            result : -1,
            message : error.name || 'get user info error'
        });
    })
    
};
exports.addFriend = addFriend;
/**
 * @description 获取用户好友列表
 * @param userInfo
 * @param callback
 */
var getFriends = function (userInfo, callback) {
    if(!userInfo && !callback){
        return ;
    }
    User.findAll({
        attributes : ['friends'],
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
            var friends = result[0] && result[0].dataValues && result[0].dataValues['friends'];
            if(friends){
                friends=friends.split('#');
                var friendsId = friends.map(function (item) {
                    return parseInt(item);
                });
                User.findAll({
                    attributes : ['userId', 'userName', 'headPicture'],
                    where : {
                        userId : friendsId
                    }
                }).then(function (result) {
                    friends = result.map(function (item) {
                        item = item.dataValues;
                        return {
                            userId : item['userId'],
                            userName : item['userName'],
                            headPicture : item['headPicture']
                        }
                    });
                    callback({
                        result : 0,
                        data : friends
                    });
                },function (error) {
                    callback({
                        result : -3,
                        message : error||'get friends error'
                    })
                })
            }else{
                callback({
                    result :-2,
                    message : 'no friends'
                })
            }
        }
    }, function (error) {
        callback({
            result : -1,
            message : error.name || 'error'
        })
    })
};

exports.getFriends = getFriends;

/**
 * 获取用于的组信息
 * @param userInfo
 * @param callback
 */
var getGroups = function (userInfo, callback) {
    if(!userInfo && !callback){
        return ;
    }
    User.findAll({
        attributes:['groups'],
        where : {
            userId : userInfo.userId
        }
    }).then(function (result) {
        if(result.length == 0){
            callback({
                result : -1,
                message : 'groups not found'
            })
        }else{
            var groups = result[0] && result[0].dataValues && result[0].dataValues['groups'];
            if(groups) {
                groups = groups.split('#');
                var groupsId = groups.map(function (item) {
                    return parseInt(item);
                });
                if (groupsId) {
                    Group.findAll({
                        attributes: ['groupName', 'groupId', 'ownerId', 'headPicture'],
                        where: {
                            groupId: groupsId
                        }
                    }).then(function (result) {
                        var groupId = result[0] && result[0].dataValues && result[0].dataValues['groupId'];
                        var groupName = result[0] && result[0].dataValues && result[0].dataValues['groupName'];
                        var headPicture = result[0] && result[0].dataValues && result[0].dataValues['headPicture'];
                        var ownerId = result[0] && result[0].dataValues && result[0].dataValues['ownerId'];
                        getUserInfo({userId: ownerId}, function (result) {
                            if (result.result == 0) {
                                var data = {
                                    groupId: groupId,
                                    groupName: groupName,
                                    groupHeadPicture: headPicture,
                                    ownerId: ownerId,
                                    ownerName: result.data.userName,
                                    ownerHeadPicture: result.data.headPicture
                                };
                                console.log('result 0');
                                callback({
                                    result: 0,
                                    data: data
                                });
                            } else {
                                callback(result);
                            }
                        });


                    }, function (error) {
                        console.log('find groups error');
                        callback({
                            result: -2,
                            message: 'find groups error'
                        })
                    })
                }

            }else{
                console.log('null');
                callback({
                    result : -3,
                    message : 'groups null'
                });
            }
        }
    },function (error) {
        callback({
            result : -1,
            message : error.name ||'error'
        })
    })
};

exports.getGroups = getGroups;

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

