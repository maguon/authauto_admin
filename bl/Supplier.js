
var sysMsg = require('../util/SystemMsg.js');
var sysError = require('../util/SystemError.js');
var resUtil = require('../util/ResponseUtil.js');
var listOfValue = require('../util/ListOfValue.js');
var supplierDAO = require('../dao/SupplierDAO.js');
var Seq = require('seq');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('Supplier.js');


function querySupplier(req,res,next){
    var params = req.params ;
    supplierDAO.getSupplier(params,function(error,result){
        if (error) {
            logger.error(' querySupplier ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            logger.info(' querySupplier ' + 'success');
            resUtil.resetQueryRes(res,result,null);
            return next();
        }
    })
}

function createSupplier(req,res,next){
    var params = req.params ;
    supplierDAO.addSupplier(params,function(error,result){
        if (error) {
            logger.error(' createSupplier ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            logger.info(' createSupplier ' + 'success');
            resUtil.resetCreateRes(res,result,null);
            return next();
        }
    })
}

function updateSupplier(req,res,next){
    var params = req.params ;
    supplierDAO.updateSupplier(params,function(error,result){
        if (error) {
            logger.error(' updateSupplier ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            logger.info(' updateSupplier ' + 'success');
            resUtil.resetUpdateRes(res,result,null);
            return next();
        }
    })
}

function updateSupplierStatus(req,res,next){
    var params = req.params ;
    supplierDAO.updateSupplierStatus(params,function(error,result){
        if (error) {
            logger.error(' updateSupplierStatus ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            logger.info(' updateSupplierStatus ' + 'success');
            resUtil.resetUpdateRes(res,result,null);
            return next();
        }
    })
}


function querySupplierCount(req,res,next){
    var params = req.params ;
    supplierDAO.getSupplierCount(params,function(error,result){
        if (error) {
            logger.error(' querySupplierCount ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            logger.info(' querySupplierCount ' + 'success');
            resUtil.resetQueryRes(res,result,null);
            return next();
        }
    })
}

module.exports ={
    querySupplier : querySupplier ,
    createSupplier : createSupplier ,
    updateSupplier : updateSupplier ,
    updateSupplierStatus : updateSupplierStatus ,
    querySupplierCount : querySupplierCount
}