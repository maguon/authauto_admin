/**
 * Created by lingxue on 2016/12/7.
 */
var producer=require('./connection/MqProducer.js').producer;
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('MqDAO.js');

/**
 *
 * @param topic
 * @param msgArray [message,keymessage]
 */
function sendTopicMessage(params,callback){
    var topicMsg = {
        topic : params.topic,
        messages : msgArray
    }
    producer.send([ topicMsg ], function (err, result) {
        callback(err,result)
    });
}

function sendSingleMessage(params,callback){
    var msgArray =[params.msg];
    var topicMsg = {
        topic : params.topic,
        messages : msgArray
    }
    producer.send([ topicMsg ], function (err, result) {
        callback(err,result)
    });
}


function sendKeyMessage(params,callback){
    var keyedMessage = new KeyedMessage(params.keyMsg.key, params.keyMsg.msg);
    var msgArray =[keyedMessage];
    var topicMsg = {
        topic : params.topic,
        messages : msgArray
    }
    producer.send([ topicMsg ], function (err, result) {
        callback(err,result)
    });
}

function getBrokerTopics(callback){
    producer.getBrokerTopic(function(error,rows,stats){
        callback(error,rows,stats)
    })
}
module.exports = {
    sendTopicMessage : sendTopicMessage ,
    sendSingleMessage : sendSingleMessage ,
    sendKeyMessage : sendKeyMessage ,
    getBrokerTopics : getBrokerTopics
}