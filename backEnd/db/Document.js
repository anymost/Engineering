/**
 * Created by bradyzhang on 2016/12/17.
 */
var Document = require('./Model').Document;
var Tool = require('../tools/index');
var Group = require('./Group');

/**
 * @description 添加新文档
 * @param groupInfo
 * @param documentInfo
 * @param callback
 */
var addDocument = function (groupInfo, documentInfo, callback) {
    if (!documentInfo && !groupInfo && !callback) {
        return;
    }
    var documentId = Tool.getRandom();
    documentInfo.documentId = documentId;
    Group.addDocument(groupInfo, documentInfo, function (json) {
        if (json.result === 0) {
            Document.create({
                documentId: documentId,
                documentName: documentInfo.documentName,
                content: documentInfo.content,
                ownerId: documentInfo.document,
                groupId: groupInfo.groupId
            }).then(function () {
                callback({
                    result: 0,
                    message: 'success'
                });
            }, function (error) {
                callback({
                    result: -4,
                    message: error.name || 'add document failed'
                });
            });
        } else {
            callback({
                result: json.result,
                message: json.message
            });
        }

    });
};

exports.addDocument = addDocument;

/**
 * @description 删除文档
 * @param groupInfo
 * @param documentInfo
 * @param callback
 */
var deleteDocument = function (groupInfo, documentInfo, callback) {
    if (!groupInfo && !documentInfo && !callback) {
        return;
    }
    Group.deleteDocument(groupInfo, documentInfo, function (json) {
        if (json.result === 0) {
            Document.destroy({
                where: {
                    documentId: documentInfo.documentId
                }
            }).then(function () {
                callback({
                    result: 0,
                    message: 'success'
                });
            }, function () {
                callback({
                    result: -4,
                    message: 'delete document failed'
                });
            });
        } else {
            callback({
                result: json.result,
                message: json.message
            });
        }
    });

};
exports.deleteDocument = deleteDocument;

/**
 * @description 更新文档名称
 * @param documentInfo
 * @param callback
 */
var updateDocumentName = function (documentInfo, callback) {
    if (!documentInfo && callback) {
        return;
    }
    Document.update({documentName: documentInfo.documentName},
        {
            where: {
                document: documentInfo.documentId
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

exports.updateDocumentName = updateDocumentName;


/**
 * @description 更新文档内容
 * @param documentInfo
 * @param callback
 */
var updateContent = function (documentInfo, callback) {
    if (!documentInfo && callback) {
        return;
    }
    Document.update({content: documentInfo.content},
        {
            where: {
                document: documentInfo.documentId
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

exports.updateContent = updateContent;
