/**
 * Created by lenovo on 2017/4/17.
 */
var express = require('express');
var Group = require('../db/Group');
var router = express.Router();



router.post('/', function (req, res, next) {
    var groupName = req.body.groupName;
    if(groupName) {
        Group.searchGroup({groupName:groupName}, function (data) {
            res.send(data);
        });
    }
});

module.exports = router;
