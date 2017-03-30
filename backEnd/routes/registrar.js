/**
 * Created by bradyzhang on 2016/12/21.
 */
var express = require('express');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var upload = multer({ dest: 'temp/' });
var router = express.Router();
var User = require('../db/User');
var filterString = require('../tools/index').filterString;
var getRandom = require('../tools/index').getRandom;




router.post('/', upload.single('headPicture'), function (req, res, next) {
    var userId = getRandom();

    var pictureType = req.file['originalname'].split('.')[1];
    if(!fs.existsSync('headPictures/users/'+userId)){
        fs.mkdirSync('headPictures/users/',userId);
    }
    var pictureName ='headPictures/users/'+userId+'/'+filterString(req.file['filename'])+'.'+pictureType;

    fs.createReadStream('temp/'+filterString(req.file['filename'])).pipe(fs.createWriteStream(pictureName));

    setTimeout(function () {
        fs.unlinkSync('temp/'+req.file['filename']);
    },3000);

    var data = {
        userId : parseInt(userId),
        userName : filterString(req.body.userName),
        password : filterString(req.body.password),
        email : req.body.email,
        phone : filterString(req.body.phone),
        headPicture : pictureName
    };


    User.addUser(data, function (json) {
        if(json.result === 0){
            res.cookie('userId', data.userId, { expires: new Date(Date.now() + 10000 * 60 * 60) });
            res.cookie('userName', data.userName, { expires: new Date(Date.now() + 10000 * 60 * 60) });
            res.cookie('headPicture', data.headPicture ,{ expires: new Date(Date.now() + 10000 * 60 * 60) });
            res.render('index');
        }else {
            res.send(json);
        }
    });
});

module.exports = router;
