/**
 * Created by ling xue on 15-12-29.
 */
var sysMsg = require('../util/SystemMsg.js');
var sysError = require('../util/SystemError.js');
var resUtil = require('../util/ResponseUtil.js');
var imageDao = require('../dao/ImageDAO.js');
var listOfValue = require('../util/ListOfValue.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('Image.js');

/**
 * get image file by image object id
 */
function getImageById(req,res,next){
    var params = req.params;
    imageDao.getMetaData(params, function (err, col) {
        if (err || !col) {
            logger.error(' getImageById ' + id +sysMsg.IMG_QUERY_NO_EXIST);
            return next(sysError.ResourceNotFoundError("",sysMsg.IMG_QUERY_NO_EXIST));
        }

        var etag = req.headers['if-none-match'];
        if (etag && col.md5 && etag == col.md5) {
            res.send(304);
            return next();
        }
        imageDao.getImage(params, function (err, fstream) {
            if (err) {
                logger.error(' getImageById ' + err.message);
                return next( sysError.ResourceNotFoundError(err.message,sysMsg.SYS_INTERNAL_ERROR_MSG));

            }

            res.cache({maxAge: 31536000});
            //res.set("cache-control","no-cache");
            res.set('content-type', col.contentType);
            res.set('last-modified', col.uploadDate);
            res.set('etag', col.md5);
            res.set('content-length', col.length);
            res.writeHead(200);
            fstream.pipe(res);
            fstream.once('end', function () {
                logger.info(' getImageById ' + 'success');
                next(false);
            });
        });
    })
}

/**
 * upload user id image,return image id
 */
function uploadImage(req,res,next){
    var params = req.params;

    var metaData = {
        type : params.type
    }
    imageDao.saveImage(req.files.image,metaData,function(error,path){
        if (error) {
            logger.error(' uploadImage ' + error.message);
            return next(sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG));
        }else{
            logger.info(' uploadImage ' + ' success ');
            res.send(200, {success:true,imageId:path});
            return next();
        }
    })
}


/**
 * upload biz license image,return image id
 */




module.exports = {
    getImageById : getImageById ,
    uploadImage : uploadImage

}
