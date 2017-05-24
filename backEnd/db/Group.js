var Group = require('./Model').Group;
var User = require('./Model').User;
var Tool = require('../tools/index');

/**
 * @description 新增分组
 * @param groupInfo
 * @param callback
 */
var addGroup = function (groupInfo, callback) {
    if (!groupInfo && !callback) {
        return;
    }
    Group.create({
        groupId: groupInfo.groupId,
        groupName: groupInfo.groupName,
        ownerId: groupInfo.ownerId,
        members: groupInfo.members,
        headPicture: groupInfo.headPicture
    }).then(function () {
        callback({
            result: 0,
            message: 'success'
        });
    }, function (error) {
        callback({
            result: -1,
            message: error.name
        });
    });
};


exports.addGroup = addGroup;

/**
 * @description 删除分组
 * @param groupInfo
 * @param callback
 */
var deleteGroup = function (groupInfo, callback) {
    if (!groupInfo && !callback) {
        return;
    }
    Group.destroy({
        where: {
            groupId: groupInfo.groupId
        }
    }).then(function () {
        callback({
            result: 0,
            message: 'success'
        });
    }, function (error) {
        callback({
            result: -1,
            message: error.name
        });
    });

};

exports.deleteGroup = deleteGroup;

/**
 * @description 获取用户对应的组信息
 * @param info
 * @param callback
 */
var getGroups = function (info, callback) {

};
exports.getGroups = getGroups;

/**
 * @description 更新分组名称
 * @param groupInfo
 * @param callback
 */
var updateGroupName = function (groupInfo, callback) {
    if (!groupInfo && !callback) {
        return;
    }
    Group.update({groupName: groupInfo.groupName},
        {
            where: {
                groupId: groupInfo.groupId
            }
        }).then(function () {
        callback({
            result: 0,
            message: 'success'
        });
    }, function (error) {
        callback({
            result: -1,
            message: error.name || 'update failed'
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
var addMember = function (info, callback) {
    if (!info && !callback) {
        return;
    }
    var groupId = info.groupId, userId = info.userId;
    Group.findAll({
        attributes: ['members'],
        where: {
            groupId: groupId
        }
    }).then(function (result) {
        var members = result && result[0] && result[0].dataValues && result[0].dataValues.members;
        if (members) {
            if (members.indexOf(userId) != -1) {

                members = members + '#' + userId;
                Group.update({members: members},
                    {
                        where: {
                            groupId: groupId
                        }
                    }
                ).then(function () {
                    callback({
                        return: 0,
                        message: 'success'
                    });
                }, function (error) {
                    callback({
                        result: -3,
                        message: error.name || 'update failed'
                    });
                });

            } else {
                callback({
                    result: -5,
                    message: 'member existed'
                });
            }
        } else {
            callback({
                result: -2,
                message: 'group not found'
            });
        }
    }, function (error) {
        callback({
            result: -1,
            message: error.name || 'connect error'
        });
    });
};

exports.addMember = addMember;


/**
 * @description 根据分组名查找分组
 * @param info
 * @param callback
 */
var searchGroup = function (info, callback) {
    var groupName = info.groupName;
    Group.findAll({
        attributes: ['groupId', 'groupName', 'headPicture'],
        where: {
            groupName: groupName
        }
    }).then(function (result) {
        if (result && result.length > 0) {
            callback({
                result: 0,
                message: 'success',
                data: result
            });
        } else {
            callback({
                result: -2,
                message: 'group not found'
            });
        }
    }, function (error) {
        callback({
            result: -1,
            message: error.name
        });
    });
};
exports.searchGroup = searchGroup;


/**
 * @description 删除分组成员
 * @param groupInfo
 * @param memberInfo
 * @param callback
 */
var deleteMember = function (groupInfo, memberInfo, callback) {
    if (!groupInfo && !memberInfo && !callback) {
        return;
    }
    Group.findAll({
        attributes: ['members'],
        where: {
            groupId: groupInfo.groupId
        }
    }).then(function (result) {
        var members = result && result[0] && result[0].dataValues && result[0].dataValues.members;
        if (members) {
            members = members.split('#');
            var index = members.indexOf(new String(memberInfo.userId));
            members.splice(index, 1);
            members = members.join('#');
            Group.update({members: members},
                {
                    where: {
                        groupId: groupInfo.groupId
                    }
                }
            ).then(function () {
                callback({
                    result: 0,
                    message: 'success'
                }, function (error) {
                    callback({
                        result: -3,
                        message: error.name || 'update failed'
                    });
                });
            });
        } else {
            callback({
                result: -2,
                message: 'group not found'
            });
        }
    }, function (error) {
        callback({
            result: -1,
            message: error.name || 'connect error'
        });
    });
};

exports.deleteMember = deleteMember;


var addMember = function (info, callback) {
    var groupId = info.groupId, userId = info.userId;
    Group.find({
        attributes: ['members'],
        where: {
            groupId: groupId
        }
    }).then(function (result) {

        var members = result.dataValues['members'];
        if (!members) {
            members = userId;
        } else {
            members = members.split('#');
            if (members.indexOf(userId) !== -1) {
                callback({
                    result: -2,
                    message: 'member has existed'
                });
                return;
            }
            members.push(userId);
            members = members.join('#');
        }
        Group.update({
            members: members
        }, {
            where: {
                groupId: groupId
            }
        }).then(function () {
            callback({
                result: 0,
                message: 'success'
            });
        }, function (error) {
            callback({
                result: -3,
                message: 'add member error'
            });
        });
    }, function () {
        callback({
            result: -1,
            message: 'get members error'
        });
    });
};
exports.addMember = addMember;

/**
 * @description 添加分组中的文档信息
 * @param info
 * @param callback
 */
var addDocument = function (info, callback) {

    var groupId = info.groupId,
        documentId = info.documentId;

    Group.find({
            attributes: ['documents']
        },
        {
            where: {
                groupId: groupId
            }
        }).then(function (result) {
        var documents = result.dataValues['documents'];
        if (documents) {
            documents = documents + '#' + documentId;
        }
        else {
            documents = documentId;
        }
        Group.update({documents: documents},
            {
                where: {
                    groupId: groupId
                }
            }).then(function () {
            callback({
                result: 0,
                message: 'success'
            });
        }, function () {
            callback({
                result: -2,
                message: 'update failed'
            });
        });
    }, function (error) {
        callback({
            result: -1,
            message: error.name || 'add failed'
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
var deleteDocument = function (groupInfo, documentInfo, callback) {
    if (!groupInfo && !documentInfo && !callback) {
        return;
    }
    Group.findAll({attributes: ['documents']},
        {
            where: {
                groupId: groupInfo.groupId
            }
        }).then(function (result) {
        var documents = result && result[0] && result[0].dataValues && result[0].dataValues.documents;
        if (documents) {
            documents = document.split('&');
            var index = documents.indexOf(new String(documentInfo.documentId));
            documents.splice(index, 1);
            documents = documents.join('&');
            Group.update({documents: documents},
                {
                    where: {
                        groupId: groupInfo.groupId
                    }
                }).then(function () {
                callback({
                    result: 0,
                    message: 'success'
                });
            }, function () {
                callback({
                    result: -3,
                    message: 'update failed'
                });
            });
        } else {
            callback({
                result: -2,
                message: 'group not found'
            });
        }
    }, function (error) {
        callback({
            result: -1,
            message: error.name || 'delete failed'
        });
    });
};

exports.deleteDocument = deleteDocument;

var showGroup = function (info, callback) {
    var groupId = info.groupId;
    Group.find({
        attributes: ['members'],
        where: {
            groupId: groupId
        }
    }).then(function (result) {
        var members = result.dataValues['members'];
        if (members) {
            members = members.split('#');
            User.findAll({
                attributes: ['userId', 'userName', 'headPicture', 'phone', 'email'],
                where: {
                    userId: members
                }
            }).then(function (result) {
                var data = result.map(function (item) {
                    var dataValues = item.dataValues;
                    return {
                        userId: dataValues['userId'],
                        userName: dataValues['userName'],
                        headPicture: dataValues['headPicture'],
                        phone: dataValues['phone'],
                        email: dataValues['email']
                    };
                });
                callback({
                    result: 0,
                    message: 'success',
                    data: data
                });
            }, function (error) {
                callback({
                    result: -2,
                    message: 'get user info error'
                });
            });

        }

    }, function (error) {
        callback({
            result: -1,
            message: 'get members error'
        });
    });

};

exports.showGroup = showGroup;


