/**
 * Created by lenovo on 2017/4/16.
 */



var express = require('express');
var Group = require('../db/Group');
var router = express.Router();



router.post('/', function (req, res, next) {

    var groupId = req.body.groupId;
    if(groupId) {
        Group.showGroup({groupId : groupId}, function (data) {
            res.send(data);
        });
    }
});

module.exports = router;
