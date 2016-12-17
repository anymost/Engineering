/**
 * Created by bradyzhang on 2016/12/17.
 */
var express = require('express');
var router = express.Router();
var User = require('../db/User');

router.post('/login', function (req, res) {
    console.log(res.body);
});
module.exports = router;