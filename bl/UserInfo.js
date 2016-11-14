var sysMsg = require('../util/SystemMsg.js');
var sysError = require('../util/SystemError.js');
var resUtil = require('../util/ResponseUtil.js');
var listOfValue = require('../util/ListOfValue.js');
var wechatUserDAO = require('../dao/WechatUserDAO.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('UserInfo.js');

function getUserInfo(req,res,next){
    var params = req.params;
    wechatUserDAO.getUser(params,function(error,rows){
        if (error) {
            logger.error(' getUserInfo ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            logger.info(' getUserInfo ' + 'success');
            resUtil.resetQueryRes(res,rows,null);
            return next();
        }
    })
}

function updateUserType(req,res,next){
    var params = req.params;
    wechatUserDAO.updateUserType(params,function(error,rows){
        if (error) {
            logger.error(' updateUserType ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            logger.info(' updateUserType ' + 'success');
            resUtil.resetQueryRes(res,rows,null);
            return next();
        }
    })
}

function updateUserStatus(req,res,next){
    var params = req.params;
    wechatUserDAO.updateUserStatus(params,function(error,rows){
        if (error) {
            logger.error(' updateUserStatus ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            logger.info(' updateUserStatus ' + 'success');
            resUtil.resetQueryRes(res,rows,null);
            return next();
        }
    })
}

function updateUserEmployee(req,res,next){
    var params = req.params;
    wechatUserDAO.updateUserEmployeeId(params,function(error,rows){
        if (error) {
            logger.error(' updateUserStatus ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            logger.info(' updateUserStatus ' + 'success');
            resUtil.resetQueryRes(res,rows,null);
            return next();
        }
    })
}
function updateUser(req,res,next){
    var params = req.params;
    wechatUserDAO.updateUserRemark(params,function(error,rows){
        if (error) {
            logger.error(' updateUser ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            logger.info(' updateUser ' + 'success');
            resUtil.resetQueryRes(res,rows,null);
            return next();
        }
    })
}
module.exports ={
    getUserInfo : getUserInfo ,
    updateUserEmployee : updateUserEmployee ,
    updateUserStatus : updateUserStatus ,
    updateUserType : updateUserType ,
    updateUser : updateUser
}