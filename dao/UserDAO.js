/**
 * Created by lingxue on 2016/11/28.
 */
var db=require('./connection/MysqlDb.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('UserDAO.js');

function addUser(params,callback){
    var query = " insert into user_info (username,phone,email,password,gender,first_name,last_name,type) values (? , ? , ? , ? , ? , ? , ? , ?)";
    var paramsArray=[],i=0;
    paramsArray[i++]=params.username;
    paramsArray[i++]=params.phone;
    paramsArray[i++]=params.email;
    paramsArray[i++]=params.password;
    paramsArray[i++]=params.gender;
    paramsArray[i++]=params.firstName;
    paramsArray[i++]=params.lastName;
    paramsArray[i]=params.type;
    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' addUser ');
        return callback(error,rows);
    });
}

function updateUser(params,callback){
    var query = " update user_info set gender= ? ,first_name= ? , last_name= ? where id = ?";
    var paramsArray=[],i=0;
    paramsArray[i++]=params.gender;
    paramsArray[i++]=params.firstName;
    paramsArray[i++]=params.lastName;
    paramsArray[i]=params.userId;

    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' updateUser ');
        return callback(error,rows);
    });
}

function updateUserStatus(params,callback){
    var query = " update user_info set status = ?  where id = ?";
    var paramsArray=[],i=0;
    paramsArray[i++]=params.status;
    paramsArray[i]=params.userId;

    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' updateUserStatus ');
        return callback(error,rows);
    });
}

function updateUserPassword(params,callback){
    var query = " update user_info set password = ?  where id = ?";
    var paramsArray=[],i=0;
    paramsArray[i++]=params.password;
    paramsArray[i]=params.userId;

    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' updateUserPassword ');
        return callback(error,rows);
    });
}

function getUser(params,callback) {
    var query = " select * from user_info where id is not null ";
    var paramsArray=[],i=0;
    if(params.userId){
        paramsArray[i++] = params.userId;
        query = query + " and id = ? ";
    }
    if(params.status){
        paramsArray[i++] = params.status;
        query = query + " and status = ? ";
    }
    if(params.type){
        paramsArray[i++] = params.type;
        query = query + " and type = ? ";
    }
    if (params.start && params.size) {
        paramsArray[i++] = parseInt(params.start);
        paramsArray[i++] = parseInt(params.size);
        query += " limit ? , ? "
    }
    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' getUser ');
        return callback(error,rows);
    });
}
function getUserCount(params,callback) {
    var query = " select count(id) from user_info where id is not null ";
    var paramsArray=[],i=0;
    if(params.status){
        paramsArray[i++] = params.status;
        query = query + " and status = ? ";
    }
    if(params.type){
        paramsArray[i++] = params.type;
        query = query + " and type = ? ";
    }
    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' getUser ');
        return callback(error,rows);
    });
}
module.exports ={
    addUser : addUser ,
    updateUser : updateUser ,
    updateUserStatus : updateUserStatus ,
    updateUserPassword : updateUserPassword ,
    getUser : getUser ,
    getUserCount : getUserCount
}