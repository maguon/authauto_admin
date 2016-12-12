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
    var paramsArray=[],i=0;
    paramsArray[i++]=params.autoId;
    paramsArray[i++]=params.nameCn;
    paramsArray[i++]=params.nameEn;
    paramsArray[i++]=params.img;
    paramsArray[i++]=params.brandId;
    paramsArray[i++]=params.brandCn;
    paramsArray[i++]=params.brandEn;
    paramsArray[i++]=params.extraId;
    paramsArray[i++]=params.extraType;
    paramsArray[i++]=params.extraYear;
    paramsArray[i++]=params.extraVol;
    paramsArray[i++]=params.extraItem;
    paramsArray[i++]=params.qty;
    paramsArray[i++]=params.remark;
    paramsArray[i]=params.end;
    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' addProcure ');
        return callback(error,rows);
    });
}

function increaseProcureCount(params,callback){
    var query = " update procure_info set count = count +1 where id = ? " ;
    var paramsArray=[],i=0;
    paramsArray[i]=params.procureId;
    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' increaseProcureCount ');
        return callback(error,rows);
    });
}

function updateProcure(params,callback){
    var query = " update procure_info set qty = ? ,remark = ? ,end = ? where id = ? " ;
    var paramsArray=[],i=0;
    paramsArray[i++]=params.qty;
    paramsArray[i++]=params.remark;
    paramsArray[i++]=params.end;
    paramsArray[i]=params.procureId;
    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' updateProcure ');
        return callback(error,rows);
    });
}

function updateProcureStatus(params,callback){
    var query = " update procure_info set status = ?  where id = ? " ;
    var paramsArray=[],i=0;
    paramsArray[i++]=params.status;
    paramsArray[i]=params.procureId;
    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' updateProcureStatus ');
        return callback(error,rows);
    });
}


function getProcure(params,callback){
    var query = " select * from procure_info where id is not null ";
    var paramsArray=[],i=0;
    if(params.procureId){
        paramsArray[i++] = params.procureId;
        query = query + " and id = ? ";
    }
    if(params.procureIds && params.procureIds.length>0){
        var idArray = params.procureIds.split(',');
        if(idArray&&idArray.length>0){
            var ids = idArray.join(',');
            query = query + " and id in( " + ids +" ) ";
        }
    }
    if(params.status){
        paramsArray[i++] = params.status;
        query = query + " and status = ? ";
    }
    if(params.autoId){
        paramsArray[i++] = params.autoId;
        query = query + " and auto_id = ? ";
    }
    if(params.brandId){
        paramsArray[i++] = params.brandId;
        query = query + " and brand_id = ? ";
    }
    if (params.start && params.size) {
        paramsArray[i++] = parseInt(params.start);
        paramsArray[i++] = parseInt(params.size);
        query += " limit ? , ? "
    }
    db.dbQuery(query,paramsArray,function(error,rows){
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