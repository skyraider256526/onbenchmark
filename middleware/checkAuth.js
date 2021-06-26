const jwt = require("jsonwebtoken");
const { JWT_EXPIRATIONTIME, JWT_SECRETKEY } = require("../utlis/constant");
const models = require("../models");

module.exports = role => async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = await req.headers.authorization.split(" ")[1];
  console.log("token from check auth ", token);
  try {
    const decoded = await jwt.verify(token, JWT_SECRETKEY);
    console.log(decoded);
    req.userData = decoded;
    if (role === "admin") {
      if (decoded.isAdmin) {
        next();
      } else {
        return res.status(401).json({
          message: "Not a admin login",
        });
      }
    } else if (role === "resourceManager") {
      if (decoded.isResourceManager) next();
      else
        return res
          .status(401)
          .json({ message: "not a resource manager login" });
    }
  } catch (error) {
    await models.logger.destroy({ where: { token: token } });
    // client.del(token, JSON.stringify(token));
    return res.status(401).json({
      message: "auth failed",
    });
  }
};
