/**
 * Created by bradyzhang on 2016/12/17.
 */
var Document = require('./Model').Document;
var Tool = require('../tools/index');


var addDocument = function (documentInfo, groupInfo, callback){
    if(!documentInfo && !groupInfo && !callback){
        return ;
    }
    var documentId = Tool.getRandom();

};

exports.addDocument = addDocument;
