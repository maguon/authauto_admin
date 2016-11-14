/**
 * Created by ling xue on 15-9-15.
 */

var db=require('./connection/MysqlDb.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('AdminUserDAO.js');

function updatePassword(params,callback){
    var query = " update admin_user set password = ? where id = ?";
    var paramArray=[],i=0;
    paramArray[i++] = params.password;
    paramArray[i] = params.adminId;
    db.dbQuery(query,paramArray,function(error,rows){
        logger.debug(' updatePassword ');
        return callback(error,rows);
    });

}

function updateInfo(params,callback){
    var query = " update admin_user set name = ? ,remark= ?,phone=? where id = ?";
    var paramArray=[],i=0;
    paramArray[i++] = params.name;
    paramArray[i++] = params.remark;
    paramArray[i++] = params.phone;
    paramArray[i] = params.adminId;
    db.dbQuery(query,paramArray,function(error,rows){
        logger.debug(' updateInfo ');
        return callback(error,rows);
    });
}

function queryAdminUser(params,callback){
    var query = " select * from admin_user where id is not null ";
    var paramArray=[],i=0;
    if(params.adminId){
        paramArray[i++] = params.adminId;
        query = query + " and id = ? ";
    }
    if(params.username){
        paramArray[i++] = params.username;
        query = query + " and username = ? ";
    }

    db.dbQuery(query,paramArray,function(error,rows){
        logger.debug(' queryAdminUser ');
        return callback(error,rows);
    });
}

function queryAdminInfo(req,res,next){
    var query = " select * from admin_user where id is not null";
    var paramArray=[],i=0;
    if(params.adminId){
        query = query + " and id = ? "
        paramArray[i++]=params.adminId;
    }
    db.dbQuery(query,paramArray,function(error,rows){
        logger.debug(' queryUser ');
        return callback(error,rows);
    });
}

module.exports = {
    updatePassword : updatePassword ,
    updateInfo : updateInfo ,
    queryAdminUser : queryAdminUser,
    queryAdminInfo : queryAdminInfo
}