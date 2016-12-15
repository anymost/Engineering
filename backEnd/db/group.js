/**
 * Created by bradyzhang on 2016/12/15.
 */

var pool = require('./dbPool');

function createGroup (groupInfo, callback){
  pool.getConnection (function (error, connection) {
        if(!error){
            connection.query('INSERT INTO `groups` VALUES(groupID,name,meme) ');
        }else{
            callback({
                result : -1,
                message : 'connect error'
            });
        }
    });

}

module.exports = {
    createGroup : createGroup
};