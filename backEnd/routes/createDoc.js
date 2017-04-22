/**
 * Created by lenovo on 2017/4/20.
 */
var express = require('express');
var Document = require('../db/Document');
var Group = require('../db/Group');
var router = express.Router();
var getRandom = require('../tools/index').getRandom;


router.post('/', function (req, res, next) {
     var documentId = getRandom();
     var  data = {
        ownerId : req.body.ownerId,
        groupId : req.body.groupId,
        documentName : req.body.documentName,
        content : req.body.content,
        documentId : documentId
    };
    Document.addDocument(data, function (data) {
        if(data.result == 0){
            Group.addDocument({
                documentId : documentId,
                groupId : req.body.groupId
            }, function (result){
                res.send(result);
            });
        }
    });

});

module.exports = router;