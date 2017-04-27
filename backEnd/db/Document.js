/**
 * Created by bradyzhang on 2016/12/17.
 */
var Document = require('./Model').Document;
var Tool = require('../tools/index');
var Group = require('./Group');

/**
 * @description 添加新文档
 * @param info
 * @param callback
 */
var addDocument = function (info, callback) {
        Document.create(info).then(function (result){
            callback({
                result : 0,
                message : 'success'
            });
        }, function (error){
            callback({
                result : -1,
                message : 'create document error'
            });
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


var getDocOfGroup = function (info, callback){
    var groupId = info.groupId;
    Document.findAll({
        attributes : ['documentId', 'documentName','ownerId'],
        where : {
            groupId : groupId
        }
    }).then(function (result){
        if(result && result.length > 0){
            var data = result.map(function (item){
                return {
                    documentId : item.dataValues['documentId'],
                    documentName　: item.dataValues['documentName'],
                    ownerId : item.dataValues['ownerId']
                };
            });
            callback({
                result : 0,
                message : 'success',
                data : data
            });
        }else{
            callback({
                result : -2,
                message : 'document empty'
            });
        }

    }, function (error){

        callback({
            result : -1,
            message : 'get group error'
        });
    });
};
exports.getDocOfGroup = getDocOfGroup;

var getDocContent = function (info, callback){
    var documentId = info.documentId;
    Document.find({
        attributes : ['content', 'documentId', 'documentName'],
        where : {
            documentId : documentId
        }
    }).then(function (result){
       var content = result.dataValues['content'];
       if(content){
           callback({
               result : 0,
               message : 'success',
               data : {
                   content : content,
                   documentId : documentId,
                   documentName : result.dataValues['documentName']
               }
           });
       }else{
           callback({
               result : -2,
               message : 'content empty',
               data : {
                   documentId : documentId,
                   documentName : result.dataValues['documentName'],
                   content : ''
               }
           });
       }

    }, function (error){
        callback({
            result : -1,
            message : 'get document error'
        });
    });
};

exports.getDocContent = getDocContent;


var saveContent = function (info, callback){
    var documentId = info.documentId,
        content = info.content;
    Document.update({
        content : content
    }, {
        where : {
            documentId : documentId
        }
    }).then(function (){
        callback({
            result : 0,
            message : 'success'
        });
    }, function (error){
        callback({
            result : -1,
            message : error
        });
    });
};

exports.saveContent = saveContent;