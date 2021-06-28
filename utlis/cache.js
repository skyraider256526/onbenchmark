const redis = require('redis');
const redisConn = require('../config/redis')
const redisClient = redis.createClient(redisConn.PORT, redisConn.HOST);

module.exports = (data) => {
    return redisClient.expireat(data, 20);
};
