/**
 * Created by bradyzhang on 2016/12/21.
 */
var express = require('express');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var upload = multer({ dest: 'temp/' });
var router = express.Router();
var Group = require('../db/Group');
var filterString = require('../tools/index').filterString;
var getRandom = require('../tools/index').getRandom;




router.post('/', upload.single('headPicture'), function (req, res, next) {
    var groupId = getRandom();
    console.log(req.file);
    var pictureType = req.file['originalname'].split('.')[1];
    if(!fs.existsSync('headPictures/groups/'+groupId)){
        fs.mkdirSync('headPictures/groups/'+groupId);
    }

    var pictureName ='headPictures/groups/'+groupId+'/'+filterString(req.file['filename'])+'.'+pictureType;

    fs.createReadStream('temp/'+filterString(req.file['filename'])).pipe(fs.createWriteStream(pictureName));

    setTimeout(function () {
        fs.unlinkSync('temp/'+req.file['filename']);
    },3000);

    var data = {
        groupId : parseInt(groupId),
        groupName : filterString(req.body.groupName),
        headPicture : pictureName,
        members : req.body.members,
        ownerId : req.body.ownerId
    };


    Group.addGroup(data, function (json) {
        res.send(json);
    });
});

module.exports = router;
