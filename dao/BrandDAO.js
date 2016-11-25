/**
 * Created by ibm on 2016/4/10.
 */

var db=require('./connection/MysqlDb.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('BrandDAO.js');


function addBrand(params,callback){
    var query = " insert into auto_brand (brand_cn,brand_en,producer_id,image,remark) values (? , ? , ? , ? , ?)";
    var paramsArray=[],i=0;
    paramsArray[i++]=params.brandCn;
    paramsArray[i++]=params.brandEn;
    paramsArray[i++]=params.producerId;
    paramsArray[i++]=params.image;
    paramsArray[i]=params.remark;
    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' addBrand ');
        return callback(error,rows);
    });
}

function updateBrand(params,callback){
    var query = " update auto_brand set brand_cn= ? , brand_en= ?, producer_id= ? , image= ? ,remark=? where id is not null ";
    var paramsArray=[],i=0;
    paramsArray[i++] = params.brandCn;
    paramsArray[i++] = params.brandEn;
    paramsArray[i++] = params.producerId;
    paramsArray[i++] = params.image;
    paramsArray[i++] = params.remark;
    if(params.brandId){
        paramsArray[i++] = params.brandId;
        query = query + " and id = ? ";
    }
    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' updateBrand ');
        return callback(error,rows);
    });
}

function updateBrandStatus(params,callback){
    var query = " update brand set  status= ? where id is not null ";
    var paramsArray=[],i=0;
    paramsArray[i++] = params.status;
    if(params.brandId){
        paramsArray[i++] = params.brandId;
        query = query + " and id = ? ";
    }
    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' updateBrandStatus ');
        return callback(error,rows);
    });
}

function getBrand(params,callback){
    var query = " select ab.* ,ap.name_en,ap.name_cn,ap.image as producer_image from auto_brand ab left join auto_producer ap on ab.producer_id = ap.id where ab.id is not null ";
    var paramsArray=[],i=0;
    if(params.brandId){
        paramsArray[i++] = params.brandId;
        query = query + " and ab.id = ? ";
    }
    if(params.status){
        paramsArray[i++] = params.status;
        query = query + " and ab.status = ? ";
    }

    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' getBrand ');
        return callback(error,rows);
    });
}


function getBrandCount(params,callback){
    var query = " select  count(id) total_count from auto_brand " +
        " where id is not null ";
    var paramsArray=[],i=0;
    if(params.status){
        paramsArray[i++] = params.status;
        query = query + " and status = ? ";
    }

    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' getBrandCount ');
        return callback(error,rows);
    });
}

function getProducer(params ,callback){
    var query = " select  *  from auto_producer " +
        " where id is not null ";
    var paramsArray=[],i=0;
    if(params.producerId){
        paramsArray[i++] = params.producerId;
        query = query + " and id = ? ";
    }

    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' getProducer ');
        return callback(error,rows);
    });
}
module.exports ={
    addBrand : addBrand ,
    updateBrand : updateBrand ,
    updateBrandStatus : updateBrandStatus ,
    getBrand : getBrand ,
    getBrandCount : getBrandCount ,
    getProducer : getProducer
}