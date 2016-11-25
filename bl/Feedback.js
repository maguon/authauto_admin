/**
 * Created by lingxue on 2016/11/25.
 */
var sysMsg = require('../util/SystemMsg.js');
var sysError = require('../util/SystemError.js');
var resUtil = require('../util/ResponseUtil.js');
var listOfValue = require('../util/ListOfValue.js');
var feedbackDAO = require('../dao/FeedbackDAO.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('Feedback.js');

function createFeedback(req,res,next){
    var params = req.params ;
    feedbackDAO.addFeedback(params,function(error,result){
        if (error) {
            logger.error(' createFeedback ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            logger.info(' createFeedback ' + 'success');
            resUtil.resetCreateRes(res,result,null);
            return next();
        }
    })
}


function updateFeedbackStatus(req,res,next){
    var params = req.params ;
    feedbackDAO.updateFeedbackStatus(params,function(error,result){
        if (error) {
            logger.error(' updateFeedbackStatus ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            logger.info(' updateFeedbackStatus ' + 'success');
            resUtil.resetUpdateRes(res,result,null);
            return next();
        }
    })
}

function queryFeedback(req,res,next){
    var params = req.params ;
    feedbackDAO.getFeedback(params,function(error,result){
        if (error) {
            logger.error(' queryFeedback ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            logger.info(' queryFeedback ' + 'success');
            resUtil.resetQueryRes(res,result,null);
            return next();
        }
    })
}
module.exports = {
    queryFeedback : queryFeedback,
    createFeedback : createFeedback ,
    updateFeedbackStatus : updateFeedbackStatus
}