var db=require('./connection/MysqlDb.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('SupplierDAO.js');

function addSupplier(params,callback){
    var query = " insert into supplier (biz_name,contact,email,phone,fax,zipcode,state,city,address,website,remark) " +
        "  values (? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? )";
    var paramsArray=[],i=0;
    paramsArray[i++]=params.bizName;
    paramsArray[i++]=params.contact;
    paramsArray[i++]=params.email;
    paramsArray[i++]=params.phone;
    paramsArray[i++]=params.fax;
    paramsArray[i++]=params.zipcode;
    paramsArray[i++]=params.state;
    paramsArray[i++]=params.city;
    paramsArray[i++]=params.address;
    paramsArray[i++]=params.website;
    paramsArray[i]=params.remark;
    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' addSupplier ');
        return callback(error,rows);
    });
}

function updateSupplier(params,callback){
    var query = " update supplier set biz_name = ? ,contact = ? ,email = ? ,phone = ? " +
        " ,fax = ? ,zipcode = ? ,state = ? ,city = ? ,address = ? ,website = ? ,remark = ?  where id = ? " ;

    var paramsArray=[],i=0;
    paramsArray[i++]=params.bizName;
    paramsArray[i++]=params.contact;
    paramsArray[i++]=params.email;
    paramsArray[i++]=params.phone;
    paramsArray[i++]=params.fax;
    paramsArray[i++]=params.zipcode;
    paramsArray[i++]=params.state;
    paramsArray[i++]=params.city;
    paramsArray[i++]=params.address;
    paramsArray[i++]=params.website;
    paramsArray[i++]=params.remark;
    paramsArray[i]=params.supplierId;
    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' updateSupplier ');
        return callback(error,rows);
    });
}

function updateSupplierStatus(params,callback){
    var query = " update supplier set status=? where id = ? " ;
    var paramsArray=[],i=0;
    paramsArray[i++]=params.supplierStatus;
    paramsArray[i]=params.supplierId;
    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' updateSupplierStatus ');
        return callback(error,rows);
    });
}


function getSupplier(params,callback){
    var query = " select * from supplier where id is not null " ;
    var paramsArray=[],i=0;
    if(params.phone){
        paramsArray[i++] = params.phone;
        query = query + " and phone = ? ";
    }
    if(params.email){
        paramsArray[i++] = params.email;
        query = query + " and email = ? ";
    }
    if(params.zipcode){
        paramsArray[i++] = params.zipcode;
        query = query + " and zipcode = ? ";
    }
    if(params.state){
        paramsArray[i++] = params.state;
        query = query + " and state = ? ";
    }
    if(params.city){
        paramsArray[i++] = params.city;
        query = query + " and city = ? ";
    }
    if(params.bizName){
        paramsArray[i++] = params.bizName;
        query = query + " and bizName = ? ";
    }
    if(params.supplierId){
        paramsArray[i++] = params.supplierId;
        query = query + " and id = ? ";
    }
    if(params.userId){
        paramsArray[i++] = params.userId;
        query = query + " and user_id = ? ";
    }
    if(params.status){
        paramsArray[i++] = params.status;
        query = query + " and status = ? ";
    }
    if (params.start && params.size) {
        paramsArray[i++] = parseInt(params.start);
        paramsArray[i++] = parseInt(params.size);
        query += " limit ? , ? "
    }
    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' getSupplier ');
        return callback(error,rows);
    });
}

function getSupplierCount(params,callback){
    var query = " select  count(id) total_count from supplier " +
        " where id is not null ";
    var paramsArray=[],i=0;
    if(params.status){
        paramsArray[i++] = params.status;
        query = query + " and status = ? ";
    }

    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' getSupplierCount ');
        return callback(error,rows);
    });
}

function updateSupplierRel(params,callback){
    var query = " update supplier set user_id=? where id is not null " ;
    var paramsArray=[],i=0;
    paramsArray[i++]=params.userId;
    if(params.supplierId){
        paramsArray[i++] = params.supplierId;
        query = query + " and id = ? ";
    }
    if(params.email){
        paramsArray[i++] = params.email;
        query = query + " and email = ? ";
    }
    paramsArray[i]=params.supplierId;
    db.dbQuery(query,paramsArray,function(error,rows){
        logger.debug(' updateSupplierRel ');
        return callback(error,rows);
    });
}
module.exports ={
    addSupplier : addSupplier ,
    updateSupplier : updateSupplier ,
    updateSupplierStatus : updateSupplierStatus,
    getSupplier : getSupplier ,
    getSupplierCount : getSupplierCount ,
    updateSupplierRel : updateSupplierRel
}