/**
 * Created by lingxue on 2016/11/10.
 */
var db=require('./connection/MysqlDb.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('BrandDAO.js');


function addAuto(params,callback){
    var query = " insert into auto_info (name_cn,name_en,brand_id,img,remark) values (? , ? , ? , ? , ? )";
    var paramsArray=[],i=0;
    paramsArray[i++]=params.nameCn;
    paramsArray[i++]=params.nameEn;
    paramsArray[i++]=params.brandId;
    paramsArray[i++]=params.img;
    paramsArray[i]=params.remark;
    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' addAuto ');
        return callback(error,rows);
    });
}

function updateAuto(params,callback){
    var query = " update auto_info set name_cn= ? , name_en= ?, brand_id= ? , img= ? ,remark=? where id is not null ";
    var paramsArray=[],i=0;
    paramsArray[i++]=params.nameCn;
    paramsArray[i++]=params.nameEn;
    paramsArray[i++]=params.brandId;
    paramsArray[i++]=params.img;
    paramsArray[i++]=params.remark;
    if(params.autoId){
        paramsArray[i++] = params.autoId;
        query = query + " and id = ? ";
    }
    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' updateAuto ');
        return callback(error,rows);
    });
}

function updateAutoStatus(params,callback){
    var query = " update auto_info set  status= ? where id is not null ";
    var paramsArray=[],i=0;
    paramsArray[i++] = params.status;
    if(params.carId){
        paramsArray[i++] = params.carId;
        query = query + " and id = ? ";
    }
    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' updateAutoStatus ');
        return callback(error,rows);
    });
}

function getAuto(params,callback){
    var query = " select ai.* ,ab.brand_en,ab.brand_cn,ab.image as brand_image " +
        " from auto_info ai left join auto_brand ab on ai.brand_id = ab.id " +
        " where ab.id is not null ";
    var paramsArray=[],i=0;
    if(params.autoId){
        paramsArray[i++] = params.autoId;
        query = query + " and ai.id = ? ";
    }
    if(params.brandId){
        paramsArray[i++] = params.brandId;
        query = query + " and ai.brand_id = ? ";
    }
    if(params.status){
        paramsArray[i++] = params.status;
        query = query + " and ai.status = ? ";
    }
    if (params.start && params.size) {
        paramsArray[i++] = parseInt(params.start);
        paramsArray[i++] = parseInt(params.size);
        query += " limit ? , ? "
    }
    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' getAuto ');
        return callback(error,rows);
    });
}

function getAutoCount(params,callback){
    var query = " select  count(id) total_count from auto_info " +
        " where id is not null ";
    var paramsArray=[],i=0;
    if(params.status){
        paramsArray[i++] = params.status;
        query = query + " and status = ? ";
    }

    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' getAuto ');
        return callback(error,rows);
    });
}


function getAutoExtra(params,callback){
    var query = " select  *  from auto_info_extra " +
        " where id is not null ";
    var paramsArray=[],i=0;
    if(params.autoId){
        paramsArray[i++] = params.autoId;
        query = query + " and auto_id = ? ";
    }
    if(params.type){
        paramsArray[i++] = params.type;
        query = query + " and type = ? ";
    }
    if(params.year){
        paramsArray[i++] = params.year;
        query = query + " and year = ? ";
    }
    if(params.status){
        paramsArray[i++] = params.status;
        query = query + " and status = ? ";
    }

    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' getAuto ');
        return callback(error,rows);
    });
}

function addAutoExtra(params,callback){
    var query = " insert into auto_info_extra (auto_id,year,vol,item,type) values (? , ? , ? , ? , ? ) ";
    var paramsArray=[],i=0;
    paramsArray[i++]=params.autoId;
    paramsArray[i++]=params.year;
    paramsArray[i++]=params.vol;
    paramsArray[i++]=params.item;
    paramsArray[i]=params.type;

    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' addAutoExtra ');
        return callback(error,rows);
    });
}


function updateAutoExtra(params,callback){
    var query = " update auto_info_extra set year= ? , vol= ?, item= ? , type = ? where id =?  ";
    var paramsArray=[],i=0;
    paramsArray[i++]=params.year;
    paramsArray[i++]=params.vol;
    paramsArray[i++]=params.item;
    paramsArray[i++]=params.type;
    paramsArray[i++]=params.extraId;
    if(params.autoId){
        paramsArray[i++] = params.autoId;
        query = query + " and auto_id = ? ";
    }
    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' updateAutoExtra ');
        return callback(error,rows);
    });
}

function getAutoByExtra(params,callback){
    var query = " select aie.id,aie.auto_id,aie.year,aie.vol,aie.item,aie.type, " +
        " ai.name_cn,ai.name_en,ai.brand_id,ai.img,ai.remark,ab.brand_cn,ab.brand_en,ab.image " +
        " from auto_info_extra aie left join auto_info ai on aie.auto_id = ai.id " +
        " left join auto_brand ab on ai.brand_id=ab.id where aie.auto_id is not null ";
    var paramsArray=[],i=0;
    if(params.autoId){
        paramsArray[i++] = params.autoId;
        query = query + " and aie.auto_id = ? ";
    }
    if(params.extraId){
        paramsArray[i++] = params.extraId;
        query = query + " and aie.id = ? ";
    }
    if(params.brandId){
        paramsArray[i++] = params.brandId;
        query = query + " and ai.brand_id = ? ";
    }
    if(params.extraStatus){
        paramsArray[i++] = params.extraStatus;
        query = query + " and aie.status = ? ";
    }
    if(params.autoStatus){
        paramsArray[i++] = params.autoStatus;
        query = query + " and ai.status = ? ";
    }
    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' getAutoByExtra ');
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
    updateAutoExtra : updateAutoExtra ,
    getAutoByExtra : getAutoByExtra
}