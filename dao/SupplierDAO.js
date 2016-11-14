var db=require('./connection/MysqlDb.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('SupplierDAO.js');

function addSupplier(params,callback){
    var query = " insert into supplier (biz_name,contact,email,phone,fax,zipcode,state,city,address,website,remark) " +
        "  values (? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? )";
    var paramArray=[],i=0;
    paramArray[i++]=params.bizName;
    paramArray[i++]=params.contact;
    paramArray[i++]=params.email;
    paramArray[i++]=params.phone;
    paramArray[i++]=params.fax;
    paramArray[i++]=params.zipcode;
    paramArray[i++]=params.state;
    paramArray[i++]=params.city;
    paramArray[i++]=params.address;
    paramArray[i++]=params.website;
    paramArray[i]=params.remark;
    db.dbQuery(query,paramArray,function(error,rows){
        logger.debug(' addSupplier ');
        return callback(error,rows);
    });
}

function updateSupplier(params,callback){
    var query = " update supplier set biz_name = ? ,contact = ? ,email = ? ,phone = ? " +
        " ,fax = ? ,zipcode = ? ,state = ? ,city = ? ,address = ? ,website = ? ,remark = ?  where id = ? " ;

    var paramArray=[],i=0;
    paramArray[i++]=params.bizName;
    paramArray[i++]=params.contact;
    paramArray[i++]=params.email;
    paramArray[i++]=params.phone;
    paramArray[i++]=params.fax;
    paramArray[i++]=params.zipcode;
    paramArray[i++]=params.state;
    paramArray[i++]=params.city;
    paramArray[i++]=params.address;
    paramArray[i++]=params.website;
    paramArray[i++]=params.remark;
    paramArray[i]=params.supplierId;
    db.dbQuery(query,paramArray,function(error,rows){
        logger.debug(' updateSupplier ');
        return callback(error,rows);
    });
}

function updateSupplierStatus(params,callback){
    var query = " update supplier set status=? where id = ? " ;
    var paramArray=[],i=0;
    paramArray[i++]=params.supplierStatus;
    paramArray[i]=params.supplierId;
    db.dbQuery(query,paramArray,function(error,rows){
        logger.debug(' updateSupplierStatus ');
        return callback(error,rows);
    });
}


function getSupplier(params,callback){
    var query = " select * from supplier where id is not null " ;
    var paramArray=[],i=0;
    if(params.phone){
        paramArray[i++] = params.phone;
        query = query + " and phone = ? ";
    }
    if(params.email){
        paramArray[i++] = params.email;
        query = query + " and email = ? ";
    }
    if(params.zipcode){
        paramArray[i++] = params.zipcode;
        query = query + " and zipcode = ? ";
    }
    if(params.state){
        paramArray[i++] = params.state;
        query = query + " and state = ? ";
    }
    if(params.city){
        paramArray[i++] = params.city;
        query = query + " and city = ? ";
    }
    if(params.bizName){
        paramArray[i++] = params.bizName;
        query = query + " and bizName = ? ";
    }
    if(params.supplierId){
        paramArray[i++] = params.supplierId;
        query = query + " and id = ? ";
    }
    if(params.userId){
        paramArray[i++] = params.userId;
        query = query + " and user_id = ? ";
    }
    if(params.status){
        paramArray[i++] = params.status;
        query = query + " and status = ? ";
    }
    db.dbQuery(query,paramArray,function(error,rows){
        logger.debug(' getSupplier ');
        return callback(error,rows);
    });
}

function getSupplierCount(params,callback){
    var query = " select  count(id) total_count from supplier " +
        " where id is not null ";
    var paramArray=[],i=0;
    if(params.status){
        paramArray[i++] = params.status;
        query = query + " and status = ? ";
    }

    db.dbQuery(query,paramArray,function(error,rows){
        logger.debug(' getSupplierCount ');
        return callback(error,rows);
    });
}

module.exports ={
    addSupplier : addSupplier ,
    updateSupplier : updateSupplier ,
    updateSupplierStatus : updateSupplierStatus,
    getSupplier : getSupplier ,
    getSupplierCount : getSupplierCount
}