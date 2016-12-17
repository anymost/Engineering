/**
 * Created by bradyzhang on 2016/12/16.
 */

var Sequelize = require('sequelize');

/**
 * @description 数据库连接池
 */
var Pool = new Sequelize('web', 'root', 'zhangyizheng', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 5000
    }
});
/**
 * @description 用户数据模型
 * @type {Model}
 */
var User = Pool.define('users', {
    userId : {
        type : Sequelize.BIGINT,
        primaryKey : true
    },
    userName : {
        type : Sequelize.STRING,
        allowNull : false
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false
    },
    phone : {
        type : Sequelize.BIGINT,
        allowNull : false
    },
    email : {
        type : Sequelize.STRING,
        allowNull : false,
        validate : {
            isEmail : true
        }
    }
});

/**
 * @description 分组数据模型
 * @type {Model}
 */
var Group = Pool.define('groups', {
    groupId : {
        type : Sequelize.BIGINT,
        primaryKey : true,
    },
    groupName : {
        type : Sequelize.STRING,
        allowNull : false
    },
    ownerId : {
        type : Sequelize.BIGINT,
        references : {
            model : User,
            key : 'userId',

        },
        allowNull : false
    },
    members : {
        type : Sequelize.STRING(500),
        allowNull : false
    },
    documents : {
        type : Sequelize.STRING(2000),
        allowNull : true
    }
});

/**
 * @description 文档数据模型
 * @type {Model}
 */
var Document = Pool.define('documents', {
   documentId : {
       type : Sequelize.BIGINT,
       primaryKey : true,
   },
    documentName : {
        type : Sequelize.STRING,
        allowNull : false
    },
    groupId : {
        type : Sequelize.BIGINT,
        references : {
            model : Group,
            key : 'groupId'
        },
        allowNull : false
    },
    ownerId : {
        type : Sequelize.BIGINT,
        references : {
            model : User,
            key : 'userId'
        },
        allowNull : false
    },
    content : {
        type : Sequelize.BLOB,
        allowNull : false
    }
});

/**
 * @description 创建数据库表
 *  var user = User.sync({force : false});
 *  var group = Group.sync({force : false});
 *  var document = Document.sync({force : false});
 **/



exports.User = User;
exports.Group = Group;
exports.Document = Document;