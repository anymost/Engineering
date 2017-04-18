/**
 * Created by lenovo on 2017/4/18.
 */
/**
 * Created by lenovo on 2017/4/17.
 */
var express = require('express');
var Group = require('../db/Group');
var User = require('../db/User');
var router = express.Router();



router.post('/', function (req, res, next) {
    var groupId = req.body.groupId, userId = req.body.userId;
    if(groupId && userId) {
        Group.addMember({groupId : groupId, userId : userId}, function (result){
            if(result.result == 0){
                User.addGroup({groupId : groupId, userId : userId}, function (result){
                   res.send(result);
                });
            }

        });
    }
});

module.exports = router;
