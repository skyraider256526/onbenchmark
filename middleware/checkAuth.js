const jwt = require("jsonwebtoken");
const { JWT_EXPIRATIONTIME, JWT_SECRETKEY } = require("../utlis/constant");
const models = require("../models");
const redis = require("redis");
const redisConn = require("../config/redis");

const client = redis.createClient(redisConn.PORT, redisConn.HOST);

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = await req.headers.authorization.split(" ")[1];
  console.log("token from check auth ", token);
  try {
    const decoded = jwt.verify(token, JWT_SECRETKEY);
    req.userData = decoded;
    if (decoded.isAdmin) {
      next();
    } else {
      return res.status(401).json({
        message: "Not a admin login",
      });
    }
  } catch (error) {
    await models.logger.destroy({ where: { token: token } });
    client.del(token, JSON.stringify(token));
    return res.status(401).json({
      message: "auth failed",
    });
  }
};
