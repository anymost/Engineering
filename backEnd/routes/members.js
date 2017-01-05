/**
 * Created by bradyzhang on 2017/1/5.
 */
var express = require('express');
var router = express.Router();


router.post('/', function (req, res, next) {
    res.set({'Access-Control-Allow-Origin':'*'});
    console.log(req.body.name);
    res.send({
        name:'jack'
    });
});

module.exports = router;
