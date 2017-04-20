/**
 * Created by lenovo on 2017/4/20.
 */
var express = require('express');
var Document = require('../db/Document');
var router = express.Router();
var getRandom = require('../tools').getRandom();


router.post('/', function (req, res, next) {

    var  data = {
        ownerId : req.body.ownerId,
        groupId : req.body.groupId,
        documentName : req.body.documentName,
        content : req.body.content,
        documentId : getRandom()
    };

    Document.createDoc(data, function (data) {
        res.send(data);
    });

});

module.exports = router;