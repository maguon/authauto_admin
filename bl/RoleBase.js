/**
 * Created by ling xue on 15-9-14.
 */

var sysMsg = require('../util/SystemMsg.js');
var sysError = require('../util/SystemError.js');
var adminUserDao = require('../dao/AdminUserDAO.js');
var listOfValue = require('../util/ListOfValue.js');
var serverLogger = require('../util/ServerLogger.js');
var oAuthUtil = require('../util/OAuthUtil.js');
var logger = serverLogger.createLogger('RoleBase.js');

function checkUserToken(req,res,next){
    var tokenInfo = oAuthUtil.parseUserToken(req);
    if(tokenInfo != null && tokenInfo.userType == oAuthUtil.clientType.user
        && req.params.userId == tokenInfo.userId && tokenInfo.status == listOfValue.USER_STATUS_ACTIVE){
        return next();
    } else{
        logger.error( req.url +" \t "+ sysMsg.SYS_AUTH_TOKEN_ERROR);
        throw sysError.InternalError(sysMsg.SYS_AUTH_TOKEN_ERROR,sysMsg.SYS_AUTH_TOKEN_ERROR);
    }
}


function checkAdminToken(req,res,next){
    var tokenInfo = oAuthUtil.parseAdminToken(req);
    if(tokenInfo != null && tokenInfo.userType == oAuthUtil.clientType.admin && tokenInfo.status == listOfValue.USER_STATUS_ACTIVE){
        return next();
    }else{
        logger.error( req.url +" \t "+ sysMsg.SYS_AUTH_TOKEN_ERROR);
        throw sysError.InternalError(sysMsg.SYS_AUTH_TOKEN_ERROR,sysMsg.SYS_AUTH_TOKEN_ERROR);
    }
}




/**
 * Change old token to new token
 */
function refreshAdminToken(req,res,next){
    var params = req.params;
    var tokenInfo = oAuthUtil.parseAccessToken(params.token);
    if(tokenInfo == null || req.params.adminId != tokenInfo.userId){
        logger.warn("refreshAdminToken toke error" )
        res.send(200,{success:false});
        return next();
    }else{
        adminUserDao.queryAdminUser({adminId:tokenInfo.userId} , function(error,rows){
            if(error){
                logger.error(' refreshAdminToken ' + error.message);
                throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
            }else{
                if(rows && rows.length>0){
                    var user = {
                        userId : rows[0].id,
                        adminStatus : rows[0].admin_status
                    }
                    if(rows[0].user_status == listOfValue.USER_STATUS_NOT_ACTIVE){
                        //User status is not verified return user id

                        //user.accessToken = oAuthUtil.createAccessToken(oAuthUtil.clientType.temp,user.userId,user.userStatus);
                        logger.info('refreshAdminToken' +params.userId+ " not verified");
                    }else{
                        //User status is verified,return token
                        user.accessToken = oAuthUtil.createAccessToken(oAuthUtil.clientType.admin,user.userId,user.adminStatus);
                        logger.info('refreshAdminToken' +params.adminId+ " success");
                    }
                    user.success = true;
                    res.send(200,user);
                    return next();
                }else{
                    logger.warn("refreshToken user id error" );
                    res.send(200,{success:false});
                    return next();
                }
            }
        })
    }

}

module.exports = {
    checkUserToken : checkUserToken,
    checkAdminToken : checkAdminToken ,
    refreshAdminToken :refreshAdminToken
}