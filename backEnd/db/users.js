/**
 * Created by bradyzhang on 2016/12/15.
 */
var pool = require('./dbPool');

/**
 * 用户注册函数
 * @param userInfo 注册信息
 * @param callback 回调函数
 */
function logUp (userInfo, callback){
    pool.getConnection(function (err, connection) {
        if(!err){
            connection.query({
                sql : 'INSERT INTO  `users`(userId, name, password, phone, email) VALUES(?,?,?,?,?)',
                values : [userInfo.userId, userInfo.name, userInfo.password, userInfo.phone, userInfo.email],
                timeout : 3000
            }, function (error) {
                connection.release();
                if(!error){
                    callback({
                        result : 0,
                        message : 'success'
                    });
                }else{
                    callback({
                        result : -2,
                        message : error
                    });
                }
            });
        }else{
            callback({
                result : -1,
                message : 'connect error'
            });
        }

    });
}

function logIn (userInfo, callback){
    pool.getConnection(function (err, connection) {
       if(!err){
            connection.query({
                sql : 'SELECT name, password FROM users WHERE `name`=?',
                values : [userInfo.name],
                timeout : 3000
            }, function (error, result) {
                connection.release();
                if(!error){
                    if(result.length === 0){
                        callback({
                            result : -3,
                            message : 'username not exist'
                        });
                    }else{
                        var password = result[0]['password'];
                        if(password === userInfo.password){
                            callback({
                                result : 0,
                                message : 'success'
                            });
                        }else{
                            callback({
                                result : -4,
                                message : 'password not match'
                            });
                        }
                    }
                }else{
                    callback({
                        result : -2,
                        message : 'query error'
                    });
                }
            });

       } else{
           callback({
               result : -1,
               message : 'connect error'
           });
       }
    });
}



module.exports = {
    addUser : logUp,
    logIn : logIn
};