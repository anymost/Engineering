/**
 * Created by bradyzhang on 2016/12/16.
 */

var Sequelize = require('sequelize');

/**
 * @description 数据库连接池
 * ZHANGYIzheng520$
 */
var Pool = new Sequelize('web', 'root', 'ZHANGYIzheng520$', {
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
    userId: {
        type: Sequelize.BIGINT,
        primaryKey: true
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    headPicture : {
        type : Sequelize.STRING,
        allowNull:false
    },
    friends : {
        type : Sequelize.STRING(1000),
        allowNull:true
    },
    groups : {
        type : Sequelize.STRING(1000),
        allowNull : true
    }
});

/**
 * @description 分组数据模型
 * @type {Model}
 */
var Group = Pool.define('groups', {
    groupId: {
        type: Sequelize.BIGINT,
        primaryKey: true,
    },
    groupName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ownerId: {
        type: Sequelize.BIGINT,
        references: {
            model: User,
            key: 'userId',

        },
        allowNull: false
    },
    members: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    documents: {
        type: Sequelize.STRING(2000),
        allowNull: true
    },
    headPicture : {
        type : Sequelize.STRING(500),
        allowNull : false
    }
});

/**
 * @description 文档数据模型
 * @type {Model}
 */
var Document = Pool.define('documents', {
    documentId: {
        type: Sequelize.BIGINT,
        primaryKey: true,
    },
    documentName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    groupId: {
        type: Sequelize.BIGINT,
        references: {
            model: Group,
            key: 'groupId'
        },
        allowNull: false
    },
    ownerId: {
        type: Sequelize.BIGINT,
        references: {
            model: User,
            key: 'userId'
        },
        allowNull: false
    },
    content: {
        type: Sequelize.STRING(2000),
        allowNull: true
    }
});

/**
 * @description 消息类型模型
 * @type {Model}
 */
var Message = Pool.define('messages', {
    senderId : {
        type : Sequelize.BIGINT,
        allowNull : false,
        references: {
            model: User,
            key: 'userId',
        },
        primaryKey:true
    },
    receiverId : {
        type : Sequelize.BIGINT,
        allowNull : false,
        references: {
            model: User,
            key: 'userId'
        },
        primaryKey:true
    },
    senderName : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    message : {
        type : Sequelize.STRING,
        allow : false,
    }
    ,
    date : {
        type : Sequelize.BIGINT,
        allowNull : false,
        primaryKey : true
    }

});


/*
var user = User.sync({force : false});
var group = Group.sync({force : false});
var message = Message.sync({force: false});
var document = Document.sync({force : false});
*/








exports.User = User;
exports.Group = Group;
exports.Document = Document;
exports.Message = Message;
