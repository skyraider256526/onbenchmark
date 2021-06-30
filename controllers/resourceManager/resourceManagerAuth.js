const models = require("../../models");
const sequelize = models.sequelize;
const Sequelize = models.Sequelize;

// add resource manager
exports.addResourceManager = async (req, res, next) => {
  let {
    firstName,
    lastName,
    email,
    password,
    mobileNumber,
    createdBy,
    modifiedBy,
    roleName,
    roleDescription,
  } = req.body;
  console.log("req.body ", req.body);
  await sequelize.transaction(async t => {
    // const user = await models.resourceManager.create(
    //   { userName, email, password, mobileNumber, createdBy, modifiedBy },
    //   { transaction: t }
    // );
    const user = await models.user.create(
      {
        firstName,
        lastName,
        password,
        email,
        mobileNumber,
        createdBy,
        modifiedBy,
      },
      { transaction: t }
    );
    await models.role.create({
      role_id: user.dataValues.id,
      roleName,
      description: roleDescription,
      createdBy: user.dataValues.id,
      updatedBy: user.dataValues.id,
    });
  });
  return res.status(201).json({ message: "resource manager created" });
};

//   update resource manager
exports.updateResourceManager = async (req, res, next) => {
  let {
    userName,
    email,
    password,
    mobileNumber,
    resetPassword,
    modifiedBy,
    id,
  } = req.body;
  await sequelize.transaction(async t => {
    const resourceManager_user = await models.resourceManager.findOne({
      where: { id },
    });
    const User = await models.user.findOne({ where: { userId: id } });
    console.log("resource manager found for update ", User);
    if (!resourceManager_user) {
      return res.status(400).json({ message: "resource manager not found." });
    } else {
      if (resetPassword) {
        console.log("resource_manager is updating password also");
        await User.update(
          {
            userName,
            email,
            password,
            mobileNumber,
            resetPassword,
            modifiedBy,
          },
          { transaction: t }
        );
        await resourceManager_user.update(
          {
            userName,
            email,
            password,
            mobileNumber,
            resetPassword,
            modifiedBy,
          },
          { transaction: t }
        );
      } else {
        console.log("resource_manager is not updating password");
        await User.update(
          { userName, email, mobileNumber, modifiedBy },
          { transaction: t }
        );
        await resourceManager_user.update(
          { userName, email, mobileNumber, modifiedBy },
          { transaction: t }
        );
      }
    }
  });
  return res.status(200).json({ message: "resource manager updated" });
};

// delete resource manager
exports.deleteResourceManager = async (req, res, next) => {
  let { id } = req.body;
  let modifiedBy = 0;
  await sequelize.transaction(async t => {
    const user = await models.resourceManager.update(
      { isActive: false, modifiedBy },
      { where: { id } }
    );
    await models.userRole.update(
      { isActive: false },
      { where: { userId: id } }
    );
    await models.user.update({ isActive: false }, { where: { userId: id } });
  });
  return res.status(200).json({ message: "user deleted" });
};

// get all resource managers
exports.getAllResourceManagers = async (req, res, next) => {
  const user = await models.resourceManager.findAll({
    where: { isActive: true },
  });
  console.log(user);
  if (user.length > 0) {
    return res.status(200).json({
      message: "all resource manager detailed fetched successfully",
      user,
    });
  } else {
    return res.status(200).json({ message: "no resource manager found" });
  }
};

// get resource manager by id
exports.getResourceManagerById = async (req, res, next) => {
  let id = req.params.id;
  const userResult = await models.resourceManager.findOne({
    where: { id, isActive: true },
  });
  if (userResult) {
    return res.status(200).json({
      message: "resource manager detail fetch successfully",
      userResult,
    });
  } else {
    return res.status(401).json({ message: "Data not found" });
  }
};
