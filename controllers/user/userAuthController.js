const models = require("../../models");
const sequelize = models.sequelize;
const Sequelize = models.Sequelize;
// const cache = require("../../utlis/cache");

// add user
exports.addUser = async (req, res, next) => {
  let {
    email,
    password,
    mobileNumber,
    firstName,
    lastName,
    roleId,
    createdBy,
    modifiedBy,
    roleName,
    roleDescription,
    companyName,
  } = req.body;
  console.log("req.body ", req.body);
  await sequelize.transaction(async t => {
    const user = await models.user.create(
      {
        firstName,
        lastName,
        password,
        email,
        mobileNumber,
        createdBy,
        modifiedBy,
        companyName,
      },
      { transaction: t }
    );
    await models.userRole.create({ roleId, userId: user.id });
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
exports.updateUser = async (req, res, next) => {
  let {
    firstName,
    lastName,
    email,
    password,
    mobileNumber,
    companyName,
    resetPassword,
    modifiedBy,
    id,
  } = req.body;
  await sequelize.transaction(async t => {
    // const admin_user = await models.admin.findOne({ where: { id, isActive:true } });
    const User = await models.user.findOne({ where: { id, isActive: true } });
    console.log("user found for update ", User.dataValues.id);
    if (!User) {
      return res.status(400).json({ message: "admin user not found" });
    } else {
      if (resetPassword) {
        const newUser = await User.update(
          {
            firstName,
            lastName,
            companyName,
            email,
            password,
            mobileNumber,
            modifiedBy,
          },
          { transaction: t }
        );
        console.log(newUser);
      } else {
        const newUser = await User.update(
          { firstName, lastName, companyName, email, mobileNumber, modifiedBy },
          { transaction: t }
        );
        console.log(newUser);
      }
    }
  });
  return res.status(200).json({ message: "user updated" });
};

// delete user
exports.deleteUser = async (req, res, next) => {
  let { id } = req.params;
  let modifiedBy = 0;
  console.log("id ", id);
  await sequelize.transaction(async t => {
    // const admin_user = await models.admin.update(
    //   { isActive: false, modifiedBy },
    //   { where: { id } }
    // );
    await models.userRole.update(
      { isActive: false },
      { where: { userId: id } }
    );
    await models.role.update({ isActive: false }, { where: { role_id: id } });
    await models.user.update({ isActive: false }, { where: { id: id } });
  });
  return res.status(200).json({ message: "user deleted" });
};

// get all users
exports.getAllUser = async (req, res, next) => {
  const user = await models.user.findAll({ where: { isActive: true } });
  const roles = await models.role.findAll({ where: { isActive: true } });
  // console.log("roles ", roles)
  // console.log(user);
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

// get client list
exports.getListOfClients = async (req, res, next) => {
  const user = await models.user.findAll({ where: { isActive: true } });
  const roles = await models.role.findAll({
    where: { roleName: "client", isActive: true },
  });
  const userFound = roles.map(
    async data =>
      await models.user.findOne({ where: { id: data.role_id, isActive: true } })
  );
  const clients = await Promise.all(userFound);
  console.log("roles ", userFound);
  console.log("clients ", clients);
  if (user.length > 0) {
    return res
      .status(200)
      .json({ message: "all users detailed fetched successfully", clients });
  } else {
    return res.status(200).json({ message: "no users found" });
  }
};

// get resource manager list
exports.getListOfResourceManager = async (req, res, next) => {
  const user = await models.user.findAll({ where: { isActive: true } });
  const roles = await models.role.findAll({
    where: { roleName: "resource_manager", isActive: true },
  });
  const userFound = roles.map(
    async data => await models.user.findOne({ where: { id: data.role_id } })
  );
  const resource_managers = await Promise.all(userFound);
  // console.log("roles ", uf)
  if (user.length > 0) {
    return res.status(200).json({
      message: "all users detailed fetched successfully",
      resource_managers,
    });
  } else {
    return res.status(200).json({ message: "no users found" });
  }
};
