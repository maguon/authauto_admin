/**
 * Created by lingxue on 2016/11/28.
 */

var sysMsg = require('../util/SystemMsg.js');
var sysError = require('../util/SystemError.js');
var resUtil = require('../util/ResponseUtil.js');
var encrypt = require('../util/Encrypt.js');
var listOfValue = require('../util/ListOfValue.js');
var userDAO = require('../dao/UserDAO.js');
var oAuthUtil = require('../util/OAuthUtil.js');
var Seq = require('seq');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('User.js');


function queryUser(req,res,next){
    var params = req.params ;
    userDAO.getUser(params,function(error,result){
        if (error) {
            logger.error(' queryUser ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            logger.info(' queryUser ' + 'success');
            resUtil.resetQueryRes(res,result,null);
            return next();
        }
    })
}

function queryUserCount(req,res,next) {
    var params = req.params ;
    userDAO.getUserCount(params,function(error,result){
        if (error) {
            logger.error(' queryUserCount ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            logger.info(' queryUserCount ' + 'success');
            resUtil.resetQueryRes(res,result,null);
            return next();
        }
    })
}

function userLogin(req,res,next){
    var params = req.params;

    userDAO.getUser(params,function(error,rows){
        if (error) {
            logger.error(' userLogin ' + error.message);
            throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
        } else {
            if(rows && rows.length<1){
                logger.warn(' userLogin ' + params.email||params.phone+ sysMsg.ADMIN_LOGIN_USER_UNREGISTERED);
                //res.send(200, {success:false,errMsg:sysMsg.ADMIN_LOGIN_USER_UNREGISTERED});
                resUtil.resetFailedRes(res,sysMsg.CUST_LOGIN_USER_UNREGISTERED) ;
                return next();
            }else{
                var passwordMd5 = encrypt.encryptByMd5(params.password);
                if(passwordMd5 != rows[0].password){
                    logger.warn(' userLogin ' +params.phone+ sysMsg.CUST_LOGIN_PSWD_ERROR);
                    //res.send(200, {success:false,errMsg:sysMsg.CUST_LOGIN_PSWD_ERROR});
                    resUtil.resetFailedRes(res,sysMsg.CUST_LOGIN_PSWD_ERROR) ;
                    return next();

                }else{
                    if(rows[0].status == listOfValue.USER_STATUS_NOT_ACTIVE){
                        //Admin User status is not verified return user id
                        var user = {
                            userId : rows[0].id,
                            userStatus : rows[0].status
                        }
                        logger.info('userLogin' +params.email||params.phone+ " not actived");
                        resUtil.resetFailedRes(res,sysMsg.SYS_AUTH_TOKEN_ERROR);
                        return next();
                    }else{
                        //admin user status is active,return token
                        var user = {
                            userId : rows[0].id,
                            userStatus : rows[0].status
                        }
                        user.accessToken = oAuthUtil.createAccessToken(oAuthUtil.clientType.user,user.userId,user.userStatus);
                        logger.info(' userLogin' +params.username+ " success");
                        resUtil.resetQueryRes(res,user,null);
                        return next();
                    }
                }
            }
        }
    })
}

function userRegister(req,res,next){
    var params = req.params;
    Seq().seq(function(){
        var that = this;
        userDAO.getUser(params,function(error,rows){
            if (error) {
                logger.error(' addUser ' + error.message);
                //res.send(200,{success:false,errMsg:sysMsg.SYS_INTERNAL_ERROR_MSG});
                resUtil.resetFailedRes(res,sysMsg.SYS_INTERNAL_ERROR_MSG) ;
                return next();
            } else {
                if(rows && rows.length>0){
                    logger.warn(' addUser ' +params.phone||params.email+ sysMsg.CUST_SIGNUP_REGISTERED);
                    resUtil.resetFailedRes(res,sysMsg.CUST_SIGNUP_REGISTERED) ;
                    return next();
                }else{
                    that();
                }
            }
        })
    }).seq(function(){
        params.password = encrypt.encryptByMd5(params.password);
        userDAO.addUser(params,function(error,result){
            if (error) {
                logger.error(' addUser ' + error.message);
                throw sysError.InternalError(error.message,sysMsg.SYS_INTERNAL_ERROR_MSG);
            } else {
                if(result && result.insertId>0){
                    logger.info(' addUser ' + 'success');
                    var user = {
                        userId : result.insertId,
                        userStatus : listOfValue.USER_STATUS_ACTIVE
                    }
                    user.accessToken = oAuthUtil.createAccessToken(oAuthUtil.clientType.user,user.userId,user.userStatus);

                    resUtil.resetQueryRes(res,user,null);
                }else{
                    logger.warn(' addUser ' + 'false');
                    //res.send(200,  {success:false,errMsg:sysMsg.SYS_INTERNAL_ERROR_MSG});
                    resUtil.resetFailedRes(res,sysMsg.SYS_INTERNAL_ERROR_MSG);
                }
                return next();
            }
        })
    })
}
module.exports = {
    queryUser : queryUser ,
    queryUserCount : queryUserCount ,
    userRegister : userRegister ,
    userLogin : userLogin
}