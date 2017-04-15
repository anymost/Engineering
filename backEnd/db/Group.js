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
        groupId : groupInfo.groupId,
        groupName : groupInfo.groupName,
        ownerId : groupInfo.ownerId,
        members : groupInfo.members,
        headPicture : groupInfo.headPicture
    }).then(function () {
        console.log('ok');
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
          result : -1,
          message : error.name || 'update failed'
      });
  });
};

exports.updateGroupName = updateGroupName;

/**
 * @description 添加分组成员
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
                       result : -3,
                       message : error.name || 'update failed'
                   });
                });
            });
        }else {
            callback({
                result : -2,
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



/**
 * @description 删除分组成员
 * @param groupInfo
 * @param memberInfo
 * @param callback
 */
var deleteMember = function (groupInfo, memberInfo, callback){
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
            members = members.split('&');
            var index = members.indexOf(new String(memberInfo.userId));
            members.splice(index, 1);
            members = members.join('&');
            Group.update({members : members},
                {
                    where : {
                        groupId : groupInfo.groupId
                    }
                }
            ).then(function () {
                callback({
                    result : 0,
                    message : 'success'
                }, function (error) {
                    callback({
                        result : -3,
                        message : error.name || 'update failed'
                    });
                });
            });
        }else {
            callback({
                result : -2,
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

exports.deleteMember = deleteMember;

/**
 * @description 添加分组中的文档信息
 * @param groupInfo
 * @param documentInfo
 * @param callback
 */
var addDocument = function (groupInfo, documentInfo, callback){
    if(!groupInfo && !documentInfo && !callback){
        return;
    }
    Group.findAll({attributes : ['documents']},
        {
            where : {
                groupId : groupInfo.groupId
            }
        }).then(function (result) {
        var documents = result && result[0] && result[0].dataValues && result[0].dataValues.documents;
        if(documents){
            documents = documents + '&' + documentInfo.documentId;
            Group.update({documents:documents},
                {
                    where : {
                        groupId : groupInfo.groupId
                    }
                }).then(function () {
                    callback({
                        result : 0,
                        message : 'success'
                    });
            }, function () {
                callback({
                    result : -3,
                    message : 'update failed'
                });
            });
        }else{
            callback({
                result : -2,
                message : 'group not found'
            });
        }
    }, function (error) {
        callback({
            result : -1,
            message : error.name || 'add failed'
        });
    });
};

exports.addDocument = addDocument;


/**
 * @description 删除分组中的文档信息
 * @param groupInfo
 * @param documentInfo
 * @param callback
 */
var deleteDocument = function (groupInfo, documentInfo, callback){
    if(!groupInfo && !documentInfo && !callback){
        return;
    }
    Group.findAll({attributes : ['documents']},
        {
            where : {
                groupId : groupInfo.groupId
            }
        }).then(function (result) {
        var documents = result && result[0] && result[0].dataValues && result[0].dataValues.documents;
        if(documents){
            documents = document.split('&');
            var index = documents.indexOf(new String(documentInfo.documentId));
            documents.splice(index, 1);
            documents = documents.join('&');
            Group.update({documents:documents},
                {
                    where : {
                        groupId : groupInfo.groupId
                    }
                }).then(function () {
                callback({
                    result : 0,
                    message : 'success'
                });
            }, function () {
                callback({
                    result : -3,
                    message : 'update failed'
                });
            });
        }else{
            callback({
                result : -2,
                message : 'group not found'
            });
        }
    }, function (error) {
        callback({
            result : -1,
            message : error.name || 'delete failed'
        });
    });
};

exports.deleteDocument = deleteDocument;


