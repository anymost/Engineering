/**
 * Created by bradyzhang on 2016/12/15.
 */
var mysql = require('mysql');

/**
 * 数据库连接池
 * @type {Pool}
 */
var pool = mysql.createPool({
    connectionLimit : 10,
    host : 'localhost',
    user : 'root',
    password : 'zhangyizheng',
    database : 'web'
});

module.exports = pool;
