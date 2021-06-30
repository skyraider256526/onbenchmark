const jwt = require("jsonwebtoken");
const { JWT_EXPIRATIONTIME, JWT_SECRETKEY } = require("../utlis/constant");
const models = require("../models");

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = req.headers.authorization.split(" ")[1];
  console.log("token from check auth ", token);
  try {
    const decoded = jwt.verify(token, JWT_SECRETKEY);
    console.log(decoded);
    req.userData = decoded;
    if (decoded.isResourceManager) {
      next();
    } else {
      return res.status(401).json({
        message: "Not a resource manager login",
      });
    }
  } catch (error) {
    await models.logger.destroy({ where: { token: token } });
    // client.del(token, JSON.stringify(token));
    return res.status(401).json({
      message: "auth failed",
    });
  }
};
