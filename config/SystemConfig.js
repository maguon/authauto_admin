
/**
 * Created by ling xue on 14-4-11.
 * The file used to store the config parameter;
 * When publish new version on server ,reset the configuration parameters
 */


var mysqlConnectOptions ={
    user: 'auto',
    password: 'auth',
    database:'auto_plan',
    host: '127.0.0.1' ,
    charset : 'utf8mb4',
    //,dateStrings : 'DATETIME'
};


var logLevel = 'DEBUG';
var loggerConfig = {
    appenders: [
        { type: 'console' },
        {
            "type": "file",
            "filename": "../logs/auto.log",
            "maxLogSize": 2048000,
            "backups": 10
        }
    ]
}

function getMysqlConnectOptions (){
    return mysqlConnectOptions;
}

var mongoConfig = {
    connect : 'mongodb://127.0.0.1:27017/auto'
}

var mainPage = "supplier.html";

var zookeeperUrl = '127.0.0.1:2181';

var topicObj ={
    inviteTopic : 'invite',
    procureTopic : 'procure'
}

var taxOptions = {
    host : 'taxrates.api.avalara.com',
    port : 443,
    path : '/postal',
    key : 'MLiUTTs3byUkE/NGaBqMkNXirzTE2P/JK7zFLC1OpAn3nbUBUHEValjhQpd/yIfmknISlu7AbhbojcVhxbNFLA=='
}
module.exports = {
    getMysqlConnectOptions : getMysqlConnectOptions,
    loggerConfig : loggerConfig,
    logLevel : logLevel ,
    mongoConfig : mongoConfig ,
    mainPage : mainPage ,
    zookeeperUrl :  zookeeperUrl ,
    topicObj : topicObj ,
    taxOptions : taxOptions
}
