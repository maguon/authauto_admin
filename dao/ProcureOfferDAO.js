/**
 * Created by lingxue on 2016/12/1.
 */
var db=require('./connection/MysqlDb.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('ProcureOfferDAO.js');

function addProcureOffer(params,callback){
    var query = " insert into procure_offer (procure_id,supplier_id,user_id,price,qty,tax) " +
        " values ( ? , ? , ? , ? , ? , ? )";
    var paramsArray=[],i=0;
    paramsArray[i++]=params.procureId;
    paramsArray[i++]=params.supplierId;
    paramsArray[i++]=params.userId;
    paramsArray[i++]=params.price;
    paramsArray[i++]=params.qty;
    paramsArray[i]=params.tax;
    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' addProcureOffer ');
        return callback(error,rows);
    });
}

function updateProcureOffer(params,callback){
    var query = " update procure_info set qty = ? ,price = ?  where id = ? " ;
    var paramsArray=[],i=0;
    paramsArray[i++]=params.qty;
    paramsArray[i++]=params.price;
    paramsArray[i++]=params.offerId;
    if(params.procureId){
        paramsArray[i++] = params.procureId;
        query = query + " and procure_id = ? ";
    }
    if(params.supplierId){
        paramsArray[i++] = params.supplierId;
        query = query + " and supplier_id = ? ";
    }
    if(params.userId){
        paramsArray[i++] = params.userId;
        query = query + " and user_id = ? ";
    }
    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' updateProcureOffer ');
        return callback(error,rows);
    });
}


function getProcureOffer(params,callback){
    var query = " select * from procure_offer where id is not null ";
    var paramsArray=[],i=0;
    if(params.procureOfferId){
        paramsArray[i++] = params.procureOfferId;
        query = query + " and id = ? ";
    }
    if(params.procureId){
        paramsArray[i++] = params.procureId;
        query = query + " and procure_id = ? ";
    }
    if(params.status){
        paramsArray[i++] = params.status;
        query = query + " and status = ? ";
    }
    if(params.active){
        paramsArray[i++] = params.active;
        query = query + " and active = ? ";
    }
    if(params.supplierId){
        paramsArray[i++] = params.supplierId;
        query = query + " and supplier_id = ? ";
    }
    if(params.userId){
        paramsArray[i++] = params.userId;
        query = query + " and user_id = ? ";
    }
    if (params.start && params.size) {
        paramsArray[i++] = parseInt(params.start);
        paramsArray[i++] = parseInt(params.size);
        query += " limit ? , ? "
    }
    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' getProcureOffer ');
        return callback(error,rows);
    });
}

function getOfferFullInfo(params,callback){
    var query ="select pi.auto_id,pi.name_en,pi.name_cn,pi.img,pi.remark,pi.end, " +
        " pi.brand_cn,pi.brand_en, pi.extra_type,pi.extra_vol,pi.extra_item,pi.extra_year, po.status," +
        " po.id,po.supplier_id,po.user_id,po.price,po.qty,po.tax,po.actual_price,po.actual_qty,po.created_on,po.updated_on, " +
        " s.contact,s.biz_name,s.email s_email ,s.zipcode,s.state,s.city,s.zipcode,s.phone, " +
        " u.email u_email ,u.gender,u.first_name,u.last_name,u.created_on u_created_on " +
        " from procure_offer po left join procure_info pi on pi.id = po.procure_id " +
        " left join supplier s on po.supplier_id = s.id " +
        " left join user_info u on po.user_id= u.id " +
        " where po.id is not null ";
    var paramsArray=[],i=0;
    if(params.offerId){
        paramsArray[i++] = params.offerId;
        query = query + " and po.id = ? ";
    }
    if(params.procureStatus){
        paramsArray[i++] = params.procureStatus;
        query = query + " and pi.status = ? ";
    }
    if(params.procureId){
        paramsArray[i++] = params.procureId;
        query = query + " and po.procure_id = ? ";
    }
    if(params.status){
        paramsArray[i++] = params.status;
        query = query + " and po.status = ? ";
    }
    if(params.active){
        paramsArray[i++] = params.active;
        query = query + " and po.active = ? ";
    }
    if(params.supplierId){
        paramsArray[i++] = params.supplierId;
        query = query + " and po.supplier_id = ? ";
    }
    if(params.userId){
        paramsArray[i++] = params.userId;
        query = query + " and po.user_id = ? ";
    }
    if (params.start && params.size) {
        paramsArray[i++] = parseInt(params.start);
        paramsArray[i++] = parseInt(params.size);
        query += " limit ? , ? "
    }
    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' getOfferFullInfo ');
        return callback(error,rows);
    });
}

function updateProcureOfferStatus(params,callback){
    var query = " update procure_offer set actual_qty = ? ,actual_price = ? ,status = ? where id = ? " ;
    var paramsArray=[],i=0;
    paramsArray[i++]=params.actualQty;
    paramsArray[i++]=params.actualPrice;
    paramsArray[i++]=params.status;
    paramsArray[i++]=params.offerId;
    if(params.procureId){
        paramsArray[i++] = params.procureId;
        query = query + " and procure_id = ? ";
    }
    if(params.supplierId){
        paramsArray[i++] = params.supplierId;
        query = query + " and supplier_id = ? ";
    }
    if(params.userId){
        paramsArray[i++] = params.userId;
        query = query + " and user_id = ? ";
    }
    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' updateProcureOfferStatus ');
        return callback(error,rows);
    });
}


module.exports ={
    getProcureOffer : getProcureOffer ,
    addProcureOffer : addProcureOffer ,
    updateProcureOffer : updateProcureOffer ,
    getOfferFullInfo : getOfferFullInfo ,
    updateProcureOfferStatus : updateProcureOfferStatus
}