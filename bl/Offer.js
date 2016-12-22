/**
 * Created by lingxue on 2016/12/1.
 */
var sysMsg = require('../util/SystemMsg.js');
var sysError = require('../util/SystemError.js');
var resUtil = require('../util/ResponseUtil.js');
var listOfValue = require('../util/ListOfValue.js');
var procureOfferDAO = require('../dao/ProcureOfferDAO.js');
var procureDAO = require('../dao/ProcureDAO.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('Offer.js');
var Seq = require('seq');

function queryProcureOffer(req,res,next){
    var params = req.params ;
    procureOfferDAO.getProcureOffer(params,function(error,result){
        if (error) {
            logger.error(' queryProcureOffer ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            logger.info(' queryProcureOffer ' + 'success');
            resUtil.resetQueryRes(res,result,null);
            return next();
        }
    })
}

function queryOfferFullInfo(req,res,next){
    var params = req.params ;
    procureOfferDAO.getOfferFullInfo(params,function(error,result){
        if (error) {
            logger.error(' queryOfferFullInfo ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            logger.info(' queryOfferFullInfo ' + 'success');
            resUtil.resetQueryRes(res,result,null);
            return next();
        }
    })
}

function updateProcureOffer(req,res,next){
    var params = req.params ;
    procureOfferDAO.updateProcureOffer(params,function(error,result){
        if (error) {
            logger.error(' updateProcureOffer ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            logger.info(' updateProcureOffer ' + 'success');
            resUtil.resetUpdateRes(res,result,null);
            return next();
        }
    })
}

function createProcureOffer(req,res,next){
    var params = req.params;
    if(params.procureArray && params.procureArray.length>0){
        Seq(params.procureArray).seqEach(function(item,i){
            var that =  this;
            var subParams = {};
            subParams.supplierId = params.supplierId;
            subParams.userId = params.userId;
            subParams.procureId = item.id;
            subParams.price = item.price;
            subParams.qty = item.qty;
            Seq().seq(function(){
                var that = this;
                procureOfferDAO.addProcureOffer(subParams,function(err,result){
                    if (err) {
                        logger.error(' createProcureOffer ' + err.message);
                        throw sysError.InternalError(err.message, sysMsg.SYS_INTERNAL_ERROR_MSG);
                    } else {
                        logger.info(' createProcureOffer ' + result.insertId);
                        that();
                    }
                })
            }).seq(function(){
                var that = this;
                procureDAO.increaseProcureCount(subParams,function(err,result){
                    if (err) {
                        logger.error(' createProcureOffer ' + err.message);
                        throw sysError.InternalError(err.message, sysMsg.SYS_INTERNAL_ERROR_MSG);
                    } else {
                        logger.info(' createProcureOffer ' + 'success');
                        that();
                    }
                })
            }).seq(function(){
                that(null,i);
            })

        }).seq(function(){
            logger.info(' createProcureOffer ' + 'success');
            resUtil.resetQueryRes(res,[],null);
            return next();
        })
    }else{
        logger.error(' createProcureOffer ' + sysMsg.SYS_PARAMETERS_ERROR_MSG);
        throw sysError.InternalError(sysMsg.SYS_PARAMETERS_ERROR_MSG, sysMsg.SYS_PARAMETERS_ERROR_MSG);
    }
}


function updateProcureOfferStatus (req,res,next){
    var params = req.params ;
    procureOfferDAO.updateProcureOfferStatus(params,function(error,result){
        if (error) {
            logger.error(' updateProcureOfferStatus ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            logger.info(' updateProcureOfferStatus ' + 'success');
            resUtil.resetUpdateRes(res,result,null);
            return next();
        }
    })
}
module.exports ={
    queryOfferFullInfo : queryOfferFullInfo ,
    queryProcureOffer : queryProcureOffer ,
    updateProcureOffer : updateProcureOffer ,
    createProcureOffer : createProcureOffer ,
    updateProcureOfferStatus : updateProcureOfferStatus

}