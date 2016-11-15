/**
 * Created by lingxue on 2016/11/14.
 */

var sysMsg = require('../util/SystemMsg.js');
var sysError = require('../util/SystemError.js');
var resUtil = require('../util/ResponseUtil.js');
var listOfValue = require('../util/ListOfValue.js');
var procureDAO = require('../dao/ProcureDAO.js');
var autoDAO = require('../dao/AutoDAO.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('Procure.js');
var Seq = require('seq');

function queryProcure(req,res,next){
    var params = req.params ;
    procureDAO.getProcure(params,function(error,result){
        if (error) {
            logger.error(' queryProcure ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            logger.info(' queryProcure ' + 'success');
            resUtil.resetQueryRes(res,result,null);
            return next();
        }
    })
}

function updateProcureStatus(req,res,next){
    var params = req.params ;
    procureDAO.updateProcureStatus(params,function(error,result){
        if (error) {
            logger.error(' updateProcureStatus ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            logger.info(' updateProcureStatus ' + 'success');
            resUtil.resetUpdateRes(res,result,null);
            return next();
        }
    })
}

function updateProcure(req,res,next){
    var params = req.params ;
    procureDAO.updateProcure(params,function(error,result){
        if (error) {
            logger.error(' updateProcure ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            logger.info(' updateProcure ' + 'success');
            resUtil.resetUpdateRes(res,result,null);
            return next();
        }
    })
}

function createProcure(req,res,next){
    var params = req.params ;
    var subProcure = {};
    Seq().seq(function(){
        var that = this;
        autoDAO.getAutoByExtra(params,function(error,rows){
            if (error) {
                logger.error(' getAutoByExtra ' + error.message);
                throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
            } else {
                logger.info(' getAutoByExtra ' + 'success');
                if(rows && rows.length>0){
                    logger.info(' getAutoByExtra ' + 'success');
                    var autoExtra = rows[0] ;
                    subProcure.autoId = autoExtra.auto_id;
                    subProcure.nameCn = autoExtra.name_cn;
                    subProcure.nameEn = autoExtra.name_en;
                    subProcure.img = autoExtra.img;
                    subProcure.brandId = autoExtra.brand_id;
                    subProcure.brandCn = autoExtra.brand_cn;
                    subProcure.brandEn = autoExtra.brand_en;
                    subProcure.extraId = autoExtra.id;
                    subProcure.extraType = autoExtra.type;
                    subProcure.extraYear = autoExtra.year;
                    subProcure.extraVol = autoExtra.vol;
                    subProcure.extraItem = autoExtra.item;
                    subProcure.qty = params.qty;
                    subProcure.remark = params.remark;
                    subProcure.end = params.end;
                    that();
                }else{
                    logger.error(' getAutoByExtra ' + error.message);
                    throw sysError.InternalError(error.message,sysMsg.SYS_PARAMETERS_ERROR_MSG);
                }
            }
        })
    }).seq(function(){
        procureDAO.addProcure(subProcure,function(error,result){
            if (error) {
                logger.error(' createBrand ' + error.message);
                throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
            } else {
                logger.info(' createBrand ' + 'success');
                resUtil.resetCreateRes(res,result,null);
                return next();
            }
        })
    })

}
module.exports ={
    queryProcure : queryProcure ,
    updateProcureStatus : updateProcureStatus ,
    createProcure : createProcure ,
    updateProcure : updateProcure
}