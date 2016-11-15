/**
 * Created by lingxue on 2016/11/14.
 */
var db=require('./connection/MysqlDb.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('ProcureDAO.js');

function addProcure(params,callback){
    var query = " insert into procure_info (auto_id,name_cn,name_en,img,brand_id,brand_cn,brand_en , " +
        " extra_id,extra_type,extra_year,extra_vol,extra_item,qty,remark,end) " +
        " values (? , ? , ? , ? , ? ,? , ? , ? , ? , ? ,? , ? , ? , ? , ?)";
    var paramArray=[],i=0;
    paramArray[i++]=params.autoId;
    paramArray[i++]=params.nameCn;
    paramArray[i++]=params.nameEn;
    paramArray[i++]=params.img;
    paramArray[i++]=params.brandId;
    paramArray[i++]=params.brandCn;
    paramArray[i++]=params.brandEn;
    paramArray[i++]=params.extraId;
    paramArray[i++]=params.extraType;
    paramArray[i++]=params.extraYear;
    paramArray[i++]=params.extraVol;
    paramArray[i++]=params.extraItem;
    paramArray[i++]=params.qty;
    paramArray[i++]=params.remark;
    paramArray[i]=params.end;
    db.dbQuery(query,paramArray,function(error,rows){
        logger.debug(' addProcure ');
        return callback(error,rows);
    });
}

function increaseProcureCount(params,callback){
    var query = " update procure set count = count +1 where id = ? " ;
    var paramArray=[],i=0;
    paramArray[i]=params.procureId;
    db.dbQuery(query,paramArray,function(error,rows){
        logger.debug(' increaseProcureCount ');
        return callback(error,rows);
    });
}

function updateProcure(params,callback){
    var query = " update procure set qty = ? ,remark = ? ,end = ? where id = ? " ;
    var paramArray=[],i=0;
    paramArray[i++]=params.qty;
    paramArray[i++]=params.remark;
    paramArray[i++]=params.end;
    paramArray[i]=params.procureId;
    db.dbQuery(query,paramArray,function(error,rows){
        logger.debug(' updateProcure ');
        return callback(error,rows);
    });
}

function updateProcureStatus(params,callback){
    var query = " update procure set status = ?  where id = ? " ;
    var paramArray=[],i=0;
    paramArray[i++]=params.status;
    paramArray[i]=params.procureId;
    db.dbQuery(query,paramArray,function(error,rows){
        logger.debug(' updateProcureStatus ');
        return callback(error,rows);
    });
}


function getProcure(params,callback){
    var query = " select * from procure where id is not null ";
    var paramArray=[],i=0;
    if(params.procureId){
        paramArray[i++] = params.procureId;
        query = query + " and id = ? ";
    }
    if(params.status){
        paramArray[i++] = params.status;
        query = query + " and status = ? ";
    }
    if(params.autoId){
        paramArray[i++] = params.autoId;
        query = query + " and auto_id = ? ";
    }
    if(params.brandId){
        paramArray[i++] = params.brandId;
        query = query + " and brand_id = ? ";
    }
    db.dbQuery(query,paramArray,function(error,rows){
        logger.debug(' getProcure ');
        return callback(error,rows);
    });
}
module.exports ={
    addProcure : addProcure ,
    increaseProcureCount : increaseProcureCount ,
    updateProcureStatus : updateProcureStatus ,
    updateProcure  : updateProcure ,
    getProcure : getProcure
}