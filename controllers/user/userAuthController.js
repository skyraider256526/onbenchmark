const models = require("../../models");
const { createReferenceCode } = require("../../utlis/referenceCode");
const sequelize = models.sequelize;
const Sequelize = models.Sequelize;
const Op = Sequelize.Op;
const moment = require("moment");
const { isNull } = require("lodash");

// add user
exports.addUser = async (req, res, next) => {
  let {
    userName,
    email,
    password,
    mobileNumber,
    roleId,
    createdBy,
    modifiedBy,
  } = req.body;

  // roleId is string in req.body, we need number
  roleId = parseInt(roleId);
  console.log("req.body ", req.body);
  await sequelize.transaction(async t => {
    if (roleId === 0) {
      const user = await models.user.create(
        { userName, email, password, mobileNumber, createdBy, modifiedBy },
        { transaction: t }
      );
      await models.userRole.create(
        { userId: user.id, roleId },
        { transaction: t }
      );
      await models.role.create({
        role_id: user.id,
        roleName: "admin",
        description: "user is admin",
        createdBy: user.id,
        updatedBy: user.id,
      });
    } else if (roleId === 1) {
      const user = await models.user.create(
        { userName, email, password, mobileNumber, createdBy, modifiedBy },
        { transaction: t }
      );
      await models.userRole.create(
        { userId: user.id, roleId },
        { transaction: t }
      );
      await models.role.create({
        role_id: user.id,
        roleName: "resource_manager",
        description: "user is resource_manager",
        createdBy: user.id,
        updatedBy: user.id,
      });
    } else {
      const user = await models.user.create(
        { userName, email, password, mobileNumber, createdBy, modifiedBy },
        { transaction: t }
      );
      await models.userRole.create(
        { userId: user.id, roleId },
        { transaction: t }
      );
      await models.role.create({
        role_id: user.id,
        roleName: "client",
        description: "user is client",
        createdBy: user.id,
        updatedBy: user.id,
      });
    }
  });
  return res.json({ message: "user created" });
};

// update user
exports.updateUser = async (req, res, next) => {
  let {
    userName,
    email,
    password,
    mobileNumber,
    roleId,
    resetPassword,
    modifiedBy,
  } = req.body;
  const id = req.params.id;
  await sequelize.transaction(async t => {
    const User = await models.user.findOne({ where: { id: req.params.id } });
    console.log("user found for update ", User);
    await models.userRole.destroy({ where: { userId: id }, transaction: t });
    await models.userRole.create({ userId: id, roleId });
    if (resetPassword) {
      await User.update(
        { userName, email, password, mobileNumber, resetPassword, modifiedBy },
        { transaction: t }
      );
    } else {
      await User.update(
        { userName, email, mobileNumber, modifiedBy },
        { transaction: t }
      );
    }
  });
  return res.status(200).json({ message: "user updated" });
};

// delete user
exports.deleteUser = async (req, res, next) => {
  let id = req.params.id;
  let modifiedBy = 0;
  await sequelize.transaction(async t => {
    const user = await models.user.update(
      { isActive: false, modifiedBy },
      { where: { id } }
    );
    await models.userRole.update(
      { isActive: false },
      { where: { userId: id } }
    );
  });
  return res.status(200).json({ message: "user deleted" });
};

// get users

// get user by id
exports.getUserById = async (req, res, next) => {
  let id = req.params.id;
  const userResult = await models.user.findOne({
    where: { id, isActive: true },
  });
  if (userResult) {
    const roleResult = await models.userRole.findOne({
      where: { userId: id, isActive: true },
    });
    console.log("role result from user ", userResult);
    console.log("role result from userRole ", roleResult);
    return res
      .status(200)
      .json({ message: "user detail fetch successfully", userResult });
  } else {
    return res.status(401).json({ message: "Data not found" });
  }
};

// change role by admin
exports.changeRole = async (req, res, next) => {
  let id = req.params.id;
  let { roleId } = req.body;
  await sequelize.transaction(async t => {
    const user = await models.user.findOne({ where: { id } });
    console.log("User ", user);
    if (!user) {
      return res.status(401).json({ message: "user not found." });
    } else {
      await models.userRole.destroy({ where: { userId: id }, transaction: t });
      await models.role.destroy({ where: { role_id: id } });
      if (roleId === 0) {
        await models.userRole.create(
          { userId: id, roleId },
          { transaction: t }
        );
        await models.role.create({
          role_id: user.id,
          roleName: "admin",
          description: "user is admin",
          createdBy: user.id,
          updatedBy: user.id,
        });
      } else if (roleId === 1) {
        await models.userRole.create(
          { userId: id, roleId },
          { transaction: t }
        );
        await models.role.create({
          role_id: user.id,
          roleName: "resource_manager",
          description: "resource_manager is admin",
          createdBy: user.id,
          updatedBy: user.id,
        });
      } else {
        await models.userRole.create(
          { userId: id, roleId },
          { transaction: t }
        );
        await models.role.create({
          role_id: user.id,
          roleName: "client",
          description: "client is admin",
          createdBy: user.id,
          updatedBy: user.id,
        });
      }
      return res
        .status(200)
        .json({ message: "user status changed successfully" });
    }
  });
};

// change password by admin
exports.changePasswordByAdmin = async (req, res, next) => {
  const id = req.params.id;
  const password = req.body.password;
  let user = await models.user.findOne({ where: { id } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  } else {
    let updatePassword = await user.update(
      { password },
      { where: { id: user.dataValues.id } }
    );
    if (updatePassword[0] == 0) {
      return res.status(400).json({ message: `Password update failed.` });
    }
    return res.status(200).json({ message: "Password Updated." });
  }
};

// Send otp to user
exports.sendOtp = async (req, res, next) => {
  const { mobileNumber } = req.body;
  let userDetails = await models.user.findOne({ where: { mobileNumber } });
  if (userDetails) {
    let otp = Math.floor(1000 + Math.random() * 9000);
    const referenceCode = createReferenceCode(5);
    let createdTime = new Date();
    let expiryTime = moment.utc(createdTime).add(10, "m");

    await sequelize.transaction(async t => {
      await models.userOtp.destroy({ where: { mobileNumber }, transaction: t });
      await models.userOtp.create(
        { mobileNumber, otp, createdTime, expiryTime, referenceCode },
        { transaction: t }
      );
    });

    //FIXME: Send otp via mobile or email
    // let message =
    //    `OTP for Reset Password for Reference No. ${referenceCode}, is ${otp}. This OTP is valid for only 10 Minutes.`;
    // await sms.sendSms(mobileNumber, message);
    // request(`${CONSTANT.SMSURL}username=${CONSTANT.SMSUSERNAME}&password=${CONSTANT.SMSPASSWORD}&type=0&dlr=1&destination=${mobileNumber}&source=nicalc&message=For refrence code ${referenceCode} your OTP is ${otp}. This otp is valid for only 10 minutes`);
    return res.status(200).json({
      message: "Otp send to your Mobile number.",
      referenceCode: referenceCode,
    });
  } else {
    res
      .status(400)
      .json({ message: "User does not exists, please contact to Admin" });
  }
};

exports.verifyOtp = async (req, res, next) => {
  let { referenceCode, otp } = req.body;
  var todayDateTime = new Date();
  let verifyUser = await models.userOtp.findOne({
    where: {
      referenceCode,
      otp,
      expiryTime: {
        [Op.gte]: todayDateTime,
      },
    },
  });
  if (!verifyUser || isNull(verifyUser)) {
    return res.status(400).json({ message: `Invalid otp` });
  }
  await sequelize.transaction(async t => {
    let verifyFlag = await models.userOtp.update(
      { isVerified: true },
      { where: { id: verifyUser.id }, transaction: t }
    );
  });
  return res.status(200).json({ message: "Success", referenceCode });
};

exports.updatePassword = async (req, res, next) => {
  const { referenceCode, newPassword } = req.body;
  var todayDateTime = new Date();

  let verifyUser = await models.userOtp.findOne({
    where: { referenceCode, isVerified: true },
  });
  if (isNull(verifyUser)) {
    return res.status(400).json({ message: `Invalid otp.` });
  }
  let user = await models.user.findOne({
    where: { mobileNumber: verifyUser.mobileNumber },
  });
  if (isNull(user)) {
    return res.status(404).json({ message: "User not found" });
  }
  let updatePassword = await user.update(
    { password: newPassword, modifiedBy: user.id },
    { where: { id: user.id } }
  );
  console.log(updatePassword);
  if (updatePassword[0] == 0) {
    return res.status(400).json({ message: `Password update failed.` });
  }
  return res.status(200).json({ message: "Password Updated." });
};
