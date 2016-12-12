/**
 * Created by lingxue on 2016/12/7.
 */
var sysMsg = require('../util/SystemMsg.js');
var sysError = require('../util/SystemError.js');
var resUtil = require('../util/ResponseUtil.js');
var baseUtil = require('../util/BaseUtil.js');
var listOfValue = require('../util/ListOfValue.js');
var systemConfig = require('../config/SystemConfig.js');
var supplierDAO = require('../dao/SupplierDAO.js');
var mqDAO = require('../dao/MqDAO.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('MessageQueue.js');

function getMqTopics(req,res,next){
    var params = req.params ;
    mqDAO.getBrokerTopics(function(error,rows,stats){
        if (error) {
            logger.error(' getMqTopics ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            logger.info(' getMqTopics ' + 'success');
            resUtil.resetQueryRes(res,rows,null);
            return next();
        }
    })
}

function sendInviteEmail(req,res,next){
    var params = req.params;
    var msgObj = {
        email : params.email,
        supplierId : params.supplierId
    }
    params.topic = systemConfig.topicObj.inviteTopic;
    params.msg = baseUtil.Json2String(msgObj);
    mqDAO.sendSingleMessage(params,function(error,result){
        if (error) {
            logger.error(' sendInviteEmail ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        }else {
            logger.info(' sendInviteEmail ' + 'success');
            resUtil.resetQueryRes(res,result,null);
            return next();
        }
    })


}



module.exports = {
    getMqTopics : getMqTopics ,
    sendInviteEmail : sendInviteEmail
}

