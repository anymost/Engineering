var Group = require('./Model').Group;
var Tool = require('../tools/index');

/**
 * @description 新增分组
 * @param userInfo
 * @param callback
 */
var addGroup = function (groupInfo, callback){
    Group.create({
        groupId : Tool.getRandom(),
        groupName : groupInfo.userName,
        password : groupInfo.password,
        phone : groupInfo.phone,
        email　: 1243
    }).then(function () {
        callback({
            result : 0,
            message : 'success'
        });
    }, function (error) {
        callback({
            result : -1,
            message : error.name
        });
    });
};


exports.addUser = addUser;