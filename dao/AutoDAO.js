/**
 * Created by lingxue on 2016/11/10.
 */
var db=require('./connection/MysqlDb.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('BrandDAO.js');


function addAuto(params,callback){
    var query = " insert into auto_info (name_cn,name_en,brand_id,type,img,vol,remark) values (? , ? , ? , ? , ? , ? , ?)";
    var paramArray=[],i=0;
    paramArray[i++]=params.nameCn;
    paramArray[i++]=params.nameEn;
    paramArray[i++]=params.brandId;
    paramArray[i++]=params.img;
    paramArray[i]=params.remark;
    db.dbQuery(query,paramArray,function(error,rows){
        logger.debug(' addAuto ');
        return callback(error,rows);
    });
}

function updateAuto(params,callback){
    var query = " update auto_info set name_cn= ? , name_en= ?, brand_id= ? , img= ? ,remark=? where id is not null ";
    var paramArray=[],i=0;
    paramArray[i++]=params.nameCn;
    paramArray[i++]=params.nameEn;
    paramArray[i++]=params.brandId;
    paramArray[i++]=params.img;
    paramArray[i++]=params.remark;
    if(params.autoId){
        paramArray[i++] = params.autoId;
        query = query + " and id = ? ";
    }
    db.dbQuery(query,paramArray,function(error,rows){
        logger.debug(' updateAuto ');
        return callback(error,rows);
    });
}

function updateAutoStatus(params,callback){
    var query = " update auto_info set  status= ? where id is not null ";
    var paramArray=[],i=0;
    paramArray[i++] = params.status;
    if(params.carId){
        paramArray[i++] = params.carId;
        query = query + " and id = ? ";
    }
    db.dbQuery(query,paramArray,function(error,rows){
        logger.debug(' updateAutoStatus ');
        return callback(error,rows);
    });
}

function getAuto(params,callback){
    var query = " select ai.* ,ab.brand_en,ab.brand_cn,ab.image as brand_image " +
        " from auto_info ai left join auto_brand ab on ai.brand_id = ab.id " +
        " where ab.id is not null ";
    var paramArray=[],i=0;
    if(params.autoId){
        paramArray[i++] = params.autoId;
        query = query + " and ai.id = ? ";
    }
    if(params.status){
        paramArray[i++] = params.status;
        query = query + " and ai.status = ? ";
    }

    db.dbQuery(query,paramArray,function(error,rows){
        logger.debug(' getAuto ');
        return callback(error,rows);
    });
}

function getAutoCount(params,callback){
    var query = " select  count(id) total_count from auto_info " +
        " where id is not null ";
    var paramArray=[],i=0;
    if(params.status){
        paramArray[i++] = params.status;
        query = query + " and status = ? ";
    }

    db.dbQuery(query,paramArray,function(error,rows){
        logger.debug(' getAuto ');
        return callback(error,rows);
    });
}


function getAutoExtra(params,callback){
    var query = " select  *  from auto_info_extra " +
        " where id is not null ";
    var paramArray=[],i=0;
    if(params.autoId){
        paramArray[i++] = params.autoId;
        query = query + " and auto_id = ? ";
    }
    if(params.type){
        paramArray[i++] = params.type;
        query = query + " and type = ? ";
    }
    if(params.year){
        paramArray[i++] = params.year;
        query = query + " and year = ? ";
    }
    if(params.status){
        paramArray[i++] = params.status;
        query = query + " and status = ? ";
    }

    db.dbQuery(query,paramArray,function(error,rows){
        logger.debug(' getAuto ');
        return callback(error,rows);
    });
}

function addAutoExtra(params,callback){
    var query = " insert into auto_info_extra (auto_id,year,vol,item,type) values (? , ? , ? , ? , ? ) ";
    var paramArray=[],i=0;
    paramArray[i++]=params.autoId;
    paramArray[i++]=params.year;
    paramArray[i++]=params.vol;
    paramArray[i++]=params.item;
    paramArray[i]=params.type;

    db.dbQuery(query,paramArray,function(error,rows){
        logger.debug(' addAutoExtra ');
        return callback(error,rows);
    });
}


function updateAutoExtra(params,callback){
    var query = " update auto_info_extra set year= ? , vol= ?, item= ? , type = ? where id =?  ";
    var paramArray=[],i=0;
    paramArray[i++]=params.year;
    paramArray[i++]=params.vol;
    paramArray[i++]=params.item;
    paramArray[i++]=params.type;
    paramArray[i++]=params.extraId;
    if(params.autoId){
        paramArray[i++] = params.autoId;
        query = query + " and auto_id = ? ";
    }
    db.dbQuery(query,paramArray,function(error,rows){
        logger.debug(' updateAutoExtra ');
        return callback(error,rows);
    });
}

module.exports ={
    addAuto : addAuto ,
    updateAuto : updateAuto ,
    updateAutoStatus : updateAutoStatus ,
    getAuto : getAuto ,
    getAutoCount : getAutoCount ,
    getAutoExtra : getAutoExtra ,
    addAutoExtra : addAutoExtra ,
    updateAutoExtra : updateAutoExtra
}