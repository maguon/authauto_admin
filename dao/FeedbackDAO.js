/**
 * Created by lingxue on 2016/11/25.
 */
var db=require('./connection/MysqlDb.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('BrandDAO.js');

function addFeedback (params,callback){
    var query = " insert into feedback (email,phone,name,content) values (? , ? , ? ,?)";
    var paramsArray=[],i=0;
    paramsArray[i++]=params.email;
    paramsArray[i++]=params.phone;
    paramsArray[i++]=params.name;
    paramsArray[i]=params.content;
    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' addFeedback ');
        return callback(error,rows);
    });
}

function updateFeedbackStatus (params,callback){
    var query = " update feedback set status=? , operator = ? where id = ?";
    var paramsArray=[],i=0;
    paramsArray[i++]=params.status;
    paramsArray[i++]=params.adminId;
    paramsArray[i]=params.feedbackId;
    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' updateFeedbackStatus ');
        return callback(error,rows);
    });
}
function getFeedback (params,callback){
    var query = " select * from feedback where id is not null ";
    var paramsArray=[],i=0;
    if(params.feedbackId){
        paramsArray[i++] = params.feedbackId;
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
        logger.debug(' getFeedback ');
        return callback(error,rows);
    });
}
module.exports ={
    addFeedback : addFeedback ,
    getFeedback : getFeedback ,
    updateFeedbackStatus : updateFeedbackStatus
}