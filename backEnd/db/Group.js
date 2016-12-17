var Group = require('./Model').Group;
var Tool = require('../tools/index');

/**
 * @description 新增分组
 * @param groupInfo
 * @param callback
 */
var addGroup = function (groupInfo, callback){
    if(!groupInfo && !callback){
        return;
    }
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


exports.addGroup = addGroup;

/**
 * @description 删除分组
 * @param groupInfo
 * @param callback
 */
var deleteGroup = function (groupInfo, callback){
    if(!groupInfo && !callback){
        return;
    }
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

/**
 * @description 更新分组名称
 * @param groupInfo
 * @param callback
 */
var updateGroupName = function (groupInfo, callback){
  if(!groupInfo && !callback){
      return;
  }
  Group.update({groupName : groupInfo.groupName},
      {
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
          result : 0,
          message : error.name || 'update failed'
      });
  });
};

exports.updateGroupName = updateGroupName;

/**
 * @param 添加分组成员
 * @param groupInfo
 * @param memberInfo
 * @param callback
 */
var addMember = function (groupInfo, memberInfo, callback){
    if(!groupInfo && !memberInfo && !callback){
        return;
    }
    Group.findAll({
        attributes : ['members'],
        where : {
            groupId : groupInfo.groupId
        }
    }).then(function (result) {
        var members = result && result[0] && result[0].dataValues && result[0].dataValues.members;
        if(members){
            members = members + '&' + memberInfo.userId;
            Group.update({members : members},
                {
                    where : {
                        groupId : groupInfo.groupId
                    }
                }
            ).then(function () {
                callback({
                    return : 0,
                    message : 'success'
                }, function (error) {
                   callback({
                       result : -2,
                       message : error.name || 'update failed'
                   });
                });
            });
        }else {
            callback({
                result : -1,
                message : 'group not found'
            });
        }
    }, function (error) {
        callback({
            result : -1,
            message : error.name || 'connect error'
        });
    });
};

exports.addMember = addMember;


