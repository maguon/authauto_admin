/**
 * Created by lingxue on 2016/11/10.
 */
var sysMsg = require('../util/SystemMsg.js');
var sysError = require('../util/SystemError.js');
var resUtil = require('../util/ResponseUtil.js');
var listOfValue = require('../util/ListOfValue.js');
var autoDAO = require('../dao/AutoDAO.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('Auto.js');

function createAuto(req,res,next){
    var params = req.params ;
    autoDAO.addAuto(params,function(error,result){
        if (error) {
            logger.error(' createAuto ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            logger.info(' createAuto ' + 'success');
            resUtil.resetCreateRes(res,result,null);
            return next();
        }
    })
}



function queryAuto(req,res,next){
    var params = req.params ;
    autoDAO.getAuto(params,function(error,result){
        if (error) {
            logger.error(' queryAuto ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            logger.info(' queryAuto ' + 'success');
            resUtil.resetQueryRes(res,result,null);
            return next();
        }
    })
}



function updateAuto(req,res,next){
    var params = req.params ;
    autoDAO.updateAuto(params,function(error,result){
        if (error) {
            logger.error(' updateAuto ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            logger.info(' updateAuto ' + 'success');
            resUtil.resetUpdateRes(res,result,null);
            return next();
        }
    })
}

function removeAuto(req,res,next){
    var params = req.params ;
    params.status = listOfValue.AUTO_STATUS_NOT_ACTIVE
    autoDAO.updateAutoStatus(params,function(error,result){
        if (error) {
            logger.error(' removeAuto ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            logger.info(' removeAuto ' + 'success');
            resUtil.resetUpdateRes(res,result,null);
            return next();
        }
    })
}



function queryAutoCount(req,res,next){
    var params = req.params ;
    autoDAO.getAutoCount(params,function(error,result){
        if (error) {
            logger.error(' queryAutoCount ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            logger.info(' queryAutoCount ' + 'success');
            resUtil.resetQueryRes(res,result,null);
            return next();
        }
    })
}

function queryAutoExtra(req,res,next){
    var params = req.params ;
    autoDAO.getAutoExtra(params,function(error,result){
        if (error) {
            logger.error(' queryAutoExtra ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            logger.info(' queryAutoExtra ' + 'success');
            resUtil.resetQueryRes(res,result,null);
            return next();
        }
    })
}

function createAutoExtra(req,res,next){
    var params = req.params ;
    autoDAO.addAutoExtra(params,function(error,result){
        if (error) {
            logger.error(' createAutoExtra ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            logger.info(' createAutoExtra ' + 'success');
            resUtil.resetCreateRes(res,result,null);
            return next();
        }
    })
}

function updateAutoExtra(req,res,next){
    var params = req.params ;
    autoDAO.updateAutoExtra(params,function(error,result){
        if (error) {
            logger.error(' updateAutoExtra ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            logger.info(' updateAutoExtra ' + 'success');
            resUtil.resetUpdateRes(res,result,null);
            return next();
        }
    })
}

module.exports = {
    createAuto : createAuto ,
    queryAuto : queryAuto ,
    updateAuto :updateAuto ,
    removeAuto : removeAuto ,
    queryAutoCount : queryAutoCount ,
    queryAutoExtra : queryAutoExtra ,
    createAutoExtra : createAutoExtra ,
    updateAutoExtra : updateAutoExtra
}