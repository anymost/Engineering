/**
 * Created by bradyzhang on 2016/12/15.
 */

var pool = require('./dbPool');

function createGroup (groupInfo, callback) {
    pool.getConnection(function (error, connection) {
        if (!error) {
            connection.query({
                sql: 'INSERT INTO `groups` VALUES(groupId,name,userId,members,documents) VALUES(?,?,?,?,?)',
                timeout: 3000,
                values: [groupInfo.groupId, groupInfo.name, groupInfo.userId, groupInfo.members, groupInfo.documents]
            }, function (error, result) {

            });

        } else {
            callback({
                result: -1,
                message: 'connect error'
            });
        }
    });

}

module.exports = {
    createGroup: createGroup
};