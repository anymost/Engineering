var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var CORS = require('cors');

/**
 * *****************router************************/
var index = require('./routes/index');
var login = require('./routes/login');
var found = require('./routes/found');
var registrar = require('./routes/registrar');
var getCode  = require('./routes/getCode');
var getUserInfo = require('./routes/getUserInfo');
var getFriends = require('./routes/getFriends');
var getGroups = require('./routes/getGroups');
var searchFriend = require('./routes/searchFriend');
var addFriend = require('./routes/addFriend');
var deleteFriend = require('./routes/deleteFriend');
var createGroup = require('./routes/createGroup');
var showGroup = require('./routes/showGroup');
var deleteMember = require('./routes/deleteMember');
var searchGroup = require('./routes/searchGroup');
var addMember = require('./routes/addMember');
var getDoc = require('./routes/getDoc');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
/**
 * cross origin config
 * @type {{origin: string, optionsSuccessStatus: number}}
 */
var CORSConfig =  {
    origin : '*',
    optionsSuccessStatus: 200
};

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/headPictures', express.static(path.join(__dirname, 'headPictures')));
app.use(CORS(CORSConfig));

app.use('/', index);
app.use('/login', login);
app.use('/found', found);
app.use('/registrar', registrar);
app.use('/getCode', getCode);
app.use('/getUserInfo', getUserInfo);
app.use('/getFriends', getFriends);
app.use('/getGroups', getGroups);
app.use('/searchFriend', searchFriend);
app.use('/addFriend', addFriend);
app.use('/deleteFriend', deleteFriend);
app.use('/createGroup', createGroup);
app.use('/showGroup', showGroup);
app.use('/deleteMember', deleteMember);
app.use('/searchGroup', searchGroup);
app.use('/addMember', addMember);
app.use('/getDoc', getDoc);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
