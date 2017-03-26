/**
 * Created by lenovo on 2017/3/26.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function (req, res, next) {
    var userId = req.body.userId;
    if(userId) {
        res.send();
    }
});

module.exports = router;
