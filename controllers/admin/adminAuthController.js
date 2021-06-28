const models = require("../../models");
const sequelize = models.sequelize;
const Sequelize = models.Sequelize;
// const cache = require("../../utlis/cache");

// add user
exports.addAdmin = async (req, res, next) => {
  let {
    userName,
    email,
    password,
    mobileNumber,
    roleId,
    createdBy,
    modifiedBy,
    roleName,
    roleDescription,
  } = req.body;
  console.log("req.body ", req.body);
  await sequelize.transaction(async (t) => {
    const user = await models.admin.create(
      { userName, email, password, mobileNumber, createdBy, modifiedBy },
      { transaction: t }
    );
    await models.user.create(
      {
        userName,
        password,
        email,
        userId: user.dataValues.id,
        mobileNumber,
        roleName,
        createdBy,
        modifiedBy,
      },
      { transaction: t }
    );
    await models.role.create(
      {
        role_id: user.id,
        roleName,
        description: roleDescription,
        createdBy: user.id,
        updatedBy: user.id,
      },
      { transaction: t }
    );
  });
  return res.status(201).json({ message: "user created" });
};

// update user
exports.updateAdmin = async (req, res, next) => {
  let {
    userName,
    email,
    password,
    mobileNumber,
    roleId,
    resetPassword,
    modifiedBy,
    id,
  } = req.body;
  await sequelize.transaction(async (t) => {
    const admin_user = await models.admin.findOne({ where: { id, isActive:true } });
    const User = await models.user.findOne({where:{ userId:id, isActive:true }})
    console.log("user found for update ", User.dataValues.userId, admin_user.dataValues.id);
    if(!admin_user){
      return res.status(400).json({message:'admin user not found'})
    }else{
      if (resetPassword) {
        await admin_user.update(
          { userName, email, password, mobileNumber, modifiedBy },
          { transaction: t }
        );
        await User.update(
          { userName, email, password, mobileNumber, modifiedBy },
          { transaction: t }
        )
      } else {
        await admin_user.update(
          { userName, email, mobileNumber, modifiedBy },
          { transaction: t }
        );
        await User.update(
          { userName, email, mobileNumber, modifiedBy },
          { transaction: t }
        )
      }
    }
  });
  return res.status(200).json({ message: "user updated" });
};

// delete user
exports.deleteAdmin = async (req, res, next) => {
  let { id } = req.body;
  let modifiedBy = 0;
  await sequelize.transaction(async (t) => {
    const admin_user = await models.admin.update(
      { isActive: false, modifiedBy },
      { where: { id } }
    );
    await models.userRole.update(
      { isActive: false },
      { where: { userId: id } }
    );
    await models.user.update(
      { isActive:false },
      { where:{userId:id}}
    )
  });
  return res.status(200).json({ message: "user deleted" });
};

// get all users
exports.getAllAdmin = async (req, res, next) => {
  const user = await models.admin.findAll({ where: { isActive: true } });
  console.log(user);
  if (user.length > 0) {
    return res
      .status(200)
      .json({ message: "all users detailed fetched successfully", user });
  } else {
    return res.status(200).json({ message: "no users found" });
  }
};

// get user by id
exports.getUserById = async (req, res, next) => {
  let id = req.params.id;
  const userResult = await models.user.findOne({
    where: { id, isActive: true },
  });
  if (userResult) {
    return res
      .status(200)
      .json({ message: "user detail fetch successfully", userResult });
  } else {
    return res.status(401).json({ message: "Data not found" });
  }
};

// change role by admin
exports.changeRole = async (req, res, next) => {
  let { roleId, id } = req.body;
  await sequelize.transaction(async (t) => {
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
  return res.status(200).json({ message: "user error occurd" });
};

// change password by admin
exports.changePasswordByAdmin = async (req, res, next) => {
  const { password, id } = req.body;
  let user = await models.admin.findOne({ where: { id } });

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
