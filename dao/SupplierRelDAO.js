var db=require('./connection/MysqlDb.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('SupplierRelDAO');

function addSupplierProdTypeRel(params,callback){
    var query = " insert into supplier_prod_type_rel (supplier_id,prod_type_id) " +
        "  values (? , ?  )";
    var paramArray=[],i=0;
    paramArray[i++]=params.supplierId;
    paramArray[i]=params.prodTypeId;
    db.dbQuery(query,paramArray,function(error,rows){
        logger.debug(' addSupplierProdTypeRel ');
        return callback(error,rows);
    });
}
function addSupplierProdRel(params,callback){
    var query = " insert into supplier_prod_rel (supplier_id,prod_id) " +
        "  values (? , ? )";
    var paramArray=[],i=0;
    paramArray[i++]=params.supplierId;
    paramArray[i]=params.prodId;
    db.dbQuery(query,paramArray,function(error,rows){
        logger.debug(' addSupplierProdRel ');
        return callback(error,rows);
    });
}

function deleteSupplierProdTypeRel(params,callback){
    var query = " delete from supplier_prod_type_rel where supplier_id=? and prod_type_id=? " ;
    var paramArray=[],i=0;
    paramArray[i++]=params.supplierId;
    paramArray[i]=params.prodTypeId;
    db.dbQuery(query,paramArray,function(error,rows){
        logger.debug(' deleteSupplierProdTypeRel ');
        return callback(error,rows);
    });
}

function deleteSupplierProdRel(params,callback){
    var query = " delete from supplier_prod_rel where  prod_id=?  " ;
    var paramArray=[],i=0;
    paramArray[i++]=params.prodId;
    if(params.supplierId){
        paramArray[i++] = params.supplierId;
        query = query + " and supplier_id=? ";
    }
    db.dbQuery(query,paramArray,function(error,rows){
        logger.debug(' deleteSupplierProdRel ');
        return callback(error,rows);
    });
}

function getSupplierProdTypeRel(params,callback){
    var query = "select s.name supplier_name,s.phone,s.remark supplier_remark, " +
        " s.lon,s.lat,s.created_on,pt.id,pt.name prod_type_name " +
        " from supplier_prod_type_rel sptr left join supplier s on sptr.supplier_id = s.id " +
        " left join prod_type pt on pt.id = sptr.prod_type_id " +
        " where sptr.id is not null " ;
    var paramArray=[],i=0;
    if(params.supplierId){
        paramArray[i++] = params.supplierId;
        query = query + " and sptr.supplier_id=? ";
    }
    if(params.prodTypeId){
        paramArray[i++] = params.prodTypeId;
        query = query + " and sptr.prod_type_id = ? ";
    }
    db.dbQuery(query,paramArray,function(error,rows){
        logger.debug(' getSupplierProdTypeRel ');
        return callback(error,rows);
    });
}




function getSupplierProdRel(params,callback){
    var query = "select s.id supplier_id,s.name supplier_name,s.phone,s.remark supplier_remark, " +
        " s.lon,s.lat,s.created_on,p.name prod_name ,p.price ,spr.id" +
        " from supplier_prod_rel spr left join supplier s on spr.supplier_id = s.id " +
        " left join prod p on p.id = spr.prod_id " +
        " where spr.id is not null " ;
    var paramArray=[],i=0;
    if(params.supplierId){
        paramArray[i++] = params.supplierId;
        query = query + " and spr.supplier_id=? ";
    }
    if(params.prodId){
        paramArray[i++] = params.prodId;
        query = query + " and spr.prod_id = ? ";
    }
    db.dbQuery(query,paramArray,function(error,rows){
        logger.debug(' getSupplierProdTypeRel ');
        return callback(error,rows);
    });
}

function updateProdSupplierRel(params,callback){
    var query = "update supplier_prod_rel set supplier_id = ? where prod_id = ? " ;
    var paramArray=[],i=0;

    paramArray[i++] = params.supplierId;
    paramArray[i++] = params.prodId;

    db.dbQuery(query,paramArray,function(error,rows){
        logger.debug(' updateProdSupplierRel ');
        return callback(error,rows);
    });
}

module.exports ={
    addSupplierProdTypeRel : addSupplierProdTypeRel ,
    addSupplierProdRel : addSupplierProdRel ,
    deleteSupplierProdTypeRel : deleteSupplierProdTypeRel ,
    deleteSupplierProdRel : deleteSupplierProdRel ,
    getSupplierProdTypeRel : getSupplierProdTypeRel ,
    getSupplierProdRel : getSupplierProdRel ,
    updateProdSupplierRel :updateProdSupplierRel
}