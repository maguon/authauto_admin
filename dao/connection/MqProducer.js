/**
 * Created by lingxue on 2016/12/7.
 */
var kafka = require('kafka-node');
var Producer = kafka.Producer;
var Client = kafka.Client;
var systemConfig = require('../../config/SystemConfig.js');
var client = new Client(systemConfig.zookeeperUrl);
var serverLogger = require('../../util/ServerLogger.js');
var logger = serverLogger.createLogger('MqProducer.js');
var producer = new Producer(client, { requireAcks: 1 });

producer.on('ready', function () {
    logger.info('Message queue is ready .');
});

producer.on('error', function (err) {
    logger.error(' Message queue producer failed ' + err.message);
});
function getBrokerTopic(callback){
    client.zk.client.getChildren('/brokers/topics', function (error, topics, stats) {
        if (error) {
            logger.error('Get mq broker topic list error: ', error.message);
        }
        callback(error,topics,stats);
    });
}
module.exports = {
    producer : producer ,
    getBrokerTopic : getBrokerTopic
}