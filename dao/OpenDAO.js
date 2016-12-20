/**
 * Created by lingxue on 2016/12/14.
 */
var httpUtil=require('../util/HttpUtil.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('OpenDAO.js');
var systemConfig = require('../config/SystemConfig.js')

function getTaxRate(params,callback){
    var taxApiOptions = systemConfig.taxOptions;
    var subParams = {
        country :'usa' ,
        apikey :  systemConfig.taxOptions.key,
        postal: params.zipcode
    }
    httpUtil.httpsGet(taxApiOptions.host,taxApiOptions.port,taxApiOptions.path,{},subParams,function(error,result){
        logger.debug(' getTaxRate ');
        return callback(error,result);
    })
}

module.exports ={
    getTaxRate  : getTaxRate
}