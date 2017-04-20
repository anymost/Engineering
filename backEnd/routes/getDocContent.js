/**
 * Created by lenovo on 2017/4/20.
 */
var express = require('express');
var Document = require('../db/Document');
var router = express.Router();



router.post('/', function (req, res, next) {

    var documentId = req.body.documentId;
    if(documentId) {
        Document.getDocContent({documentId:documentId}, function (data) {
            res.send(data);
        });
    }
});

module.exports = router;