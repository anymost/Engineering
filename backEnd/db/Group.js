var Group = require('./Model').Group;
var Tool = require('../tools/index');

/**
 * @description 新增分组
 * @param groupInfo
 * @param callback
 */
var addGroup = function (groupInfo, callback){
    Group.create({
        groupId : Tool.getRandom(),
        groupName : groupInfo.userName,
        ownerId : groupInfo.ownerId,
        members : groupInfo.members,
        documents : groupInfo.documents
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


exports.addUser = addGroup;

/**
 * @description 删除分组
 * @param groupInfo
 * @param callback
 */
var deleteGroup = function (groupInfo, callback){
  Group.destroy({
      where : {
          groupId : groupInfo.groupId
      }
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

exports.deleteGroup = deleteGroup;