// Copyright (c) 2012 Mark Cavage. All rights reserved.

var fs = require('fs');
var path = require('path');
var util = require('util');

var assert = require('assert-plus');
var restify = require('restify');

var sysConfig = require('./config/SystemConfig.js');
var serverLogger = require('./util/ServerLogger.js');
var logger = serverLogger.createLogger('Server.js');

var adminUser = require('./bl/AdminUser.js');
var roleBase = require('./bl/RoleBase.js');
var brand = require('./bl/Brand.js');
var supplier = require('./bl/Supplier.js');
var auto = require('./bl/Auto.js');
var image = require('./bl/Image.js');
var procure = require('./bl/Procure.js');
var feedback = require('./bl/Feedback.js');
var user = require('./bl/User.js');


///--- API

/**
 * Returns a server with all routes defined on it
 */
function createServer() {



    // Create a server with our logger and custom formatter
    // Note that 'version' means all routes will default to
    // 1.0.0
    var server = restify.createServer({

        name: 'AUTH-AUTO',
        version: '0.0.1'
    });


    // Ensure we don't drop data on uploads
    //server.pre(restify.pre.pause());

    // Clean up sloppy paths like //todo//////1//
    server.pre(restify.pre.sanitizePath());

    // Handles annoying user agents (curl)
    server.pre(restify.pre.userAgentConnection());




    
    // Set a per request bunyan logger (with requestid filled in)
    //server.use(restify.requestLogger());

    // Allow 5 requests/second by IP, and burst to 10
    server.use(restify.throttle({
        burst: 100,
        rate: 50,
        ip: true
    }));
    restify.CORS.ALLOW_HEADERS.push('Access-Control-Allow-Origin');
    restify.CORS.ALLOW_HEADERS.push("Access-Control-Allow-Methods","GET");
    restify.CORS.ALLOW_HEADERS.push("Access-Control-Allow-Methods","POST");
    restify.CORS.ALLOW_HEADERS.push("Access-Control-Allow-Methods","PUT");
    restify.CORS.ALLOW_HEADERS.push("Access-Control-Allow-Methods","DELETE");
    restify.CORS.ALLOW_HEADERS.push("Access-Control-Allow-Headers","x-requested-with,content-type");
    server.use(restify.CORS());

    // Use the common stuff you probably want
    //hard code the upload folder for now
    server.use(restify.bodyParser({uploadDir:__dirname+'/../uploads/'}));
    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.dateParser());
    server.use(restify.authorizationParser());
    server.use(restify.queryParser());
    server.use(restify.gzipResponse());



   

    // Now our own handlers for authentication/authorization
    // Here we only use basic auth, but really you should look
    // at https://github.com/joyent/node-http-signature

    //server.use(authenticate);

    //server.use(apiUtil.save);

    //server api doc
    server.get(/\/apidoc\/?.*/, restify.serveStatic({
        directory: './public/apidoc'
    }));

    // static files: /, /index.html, /images...
    //var STATIS_FILE_RE = /\/?\.css|\/?\.js|\/?\.png|\/?\.jpg|\/?\.gif|\/?\.jpeg|\/?\.less|\/?\.eot|\/?\.svg|\/?\.ttf|\/?\.otf|\/?\.woff|\/?\.pdf|\/?\.ico|\/?\.json|\/?\.wav|\/?\.mp3/;
    var STATIS_FILE_RE = /\.(css|js|jpe?g|png|gif|less|eot|svg|bmp|tiff|ttf|otf|woff|pdf|ico|json|wav|ogg|mp3?|xml|woff2|map)$/i;
    server.get(STATIS_FILE_RE, restify.serveStatic({ directory: './public/web', default: sysConfig.mainPage, maxAge: 0 }));
//    server.get(/^\/((.*)(\.)(.+))*$/, restify.serveStatic({ directory: './TruMenuWeb', default: "index.html" }));



    server.get(/\.html$/i,restify.serveStatic({
        directory: './public/web',
        maxAge: 0}));
    //For 'abc.html?name=zzz'
    server.get(/\.html\?/i,restify.serveStatic({
        directory: './public/web',
        maxAge: 0}));

    /**
     * Admin User Module
     */
    server.get('/api/admin/:adminId' ,adminUser.getAdminUserInfo);
    server.get('/api/admin/:adminId/token/:token',roleBase.refreshAdminToken);
    server.post({path:'/api/admin/do/login',contentType: 'application/json'},adminUser.adminUserLogin);
    server.put({path:'/api/admin/:adminId/password',contentType: 'application/json'} ,roleBase.checkAdminToken,adminUser.changeAdminPassword);
    server.put({path:'/api/admin/:adminId',contentType: 'application/json'} ,roleBase.checkAdminToken,adminUser.updateAdminInfo);

    /**
     * Image Module
     */
    server.get('/api/image/:imageId',image.getImageById);
    server.post({path:'/api/admin/:adminId/image',contentType: 'multipart/form-data'}, image.uploadImage);
    /**
     * Feedback Module
     */
    server.post({path:'/api/feedback',contentType: 'application/json'},feedback.createFeedback);
    server.put('/api/admin/:adminId/feedback/:feedbackId/status/:status',feedback.updateFeedbackStatus);
    server.get('/api/admin/:adminId/feedback' , feedback.queryFeedback);

    /**
     * Brand Module
     */
    server.post({path:'/api/admin/:adminId/brand',contentType: 'application/json'},brand.createBrand);
    server.put({path:'/api/admin/:adminId/brand/:brandId',contentType: 'application/json'} ,brand.updateBrand);
    server.get('/api/admin/:adminId/brand' , brand.queryBrand);
    server.get('/api/admin/:adminId/brandCount' , brand.queryBrandCount);
    server.get('/api/admin/:adminId/producer' , brand.queryProducer);


    /**
     * Auto Module
     */
    server.get('/api/auto' , auto.queryAuto);
    server.post({path:'/api/admin/:adminId/auto',contentType: 'application/json'},auto.createAuto);
    server.put({path:'/api/admin/:adminId/auto/:autoId',contentType: 'application/json'} ,auto.updateAuto);
    server.del('/api/admin/:adminId/auto/:autoId' , auto.removeAuto);
    server.get('/api/admin/:adminId/auto' , auto.queryAuto);
    server.get('/api/admin/:adminId/auto/:autoId/extra' , auto.queryAutoExtra);
    server.post({path:'/api/admin/:adminId/auto/:autoId/extra',contentType: 'application/json'},auto.createAutoExtra);
    server.put({path:'/api/admin/:adminId/extra/:extraId',contentType: 'application/json'} ,auto.updateAutoExtra);
    server.get('/api/admin/:adminId/autoCount' , auto.queryAutoCount);

    /**
     * Procure Module
     */
    server.get('/api/procure' , procure.queryProcure);
    server.post({path:'/api/admin/:adminId/procure',contentType: 'application/json'},procure.createProcure);
    server.put({path:'/api/admin/:adminId/procure/:procureId',contentType: 'application/json'} ,procure.updateProcure);
    server.put('/api/admin/:adminId/procure/:procureId/status/:status' ,procure.updateProcureStatus);

    /**
     * Supplier Module
     */
    server.post({path:'/api/admin/:adminId/supplier',contentType: 'application/json'},supplier.createSupplier);
    server.put({path:'/api/admin/:adminId/supplier/:supplierId',contentType: 'application/json'} ,supplier.updateSupplier);
    server.put({path:'/api/admin/:adminId/supplier/:supplierId/status/:supplierStatus',contentType: 'application/json'} ,
        supplier.updateSupplierStatus);
    server.get('/api/admin/:adminId/supplier' , supplier.querySupplier);
    server.get('/api/admin/:adminId/supplierCount' , supplier.querySupplierCount);
    server.get('/api/user/:userId/supplier' , supplier.querySupplier);

    /**
     * User Modulexc
     */
    server.get('/api/admin/:adminId/user' , user.queryUser);
    server.get('/api/admin/:adminId/userCount' , user.queryUserCount);
    server.post('/api/userLogin' , user.userLogin);
    server.post('/api/user' , user.userRegister);
    server.get('/api/user/:userId' , user.queryUser);
        //admin

    server.on('NotFound', function (req, res, next) {
        logger.warn(req.url + " not found");
        res.send(404);
        next();
    });

    return (server);

}



///--- Exports

module.exports = {
    createServer: createServer
};