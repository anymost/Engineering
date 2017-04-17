/**
 * Created by lenovo on 2017/4/16.
 */

var express = require('express');
var Group = require('../db/Group');
var User = require('../db/User');
var router = express.Router();



router.post('/', function (req, res, next) {
    var userId  = req.body.memberId,
        groupId = req.body.groupId;

    if(userId && groupId) {
       Group.deleteMember({groupId : groupId}, {userId : userId}, function (result) {
          if(result.result == 0){
              User.deleteGroup({
                  userId : userId,
                  groupId : groupId
              }, function (result) {
                 res.send(result) ;
              });
          }
       });
    }
});

module.exports = router;
