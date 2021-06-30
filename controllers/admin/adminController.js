const models = require("../../models");
const sequelize = models.sequelize;
const Sequelize = models.Sequelize;

exports.getAllClient = async (req, res) => {
  const clients = await models.client.findAll({
    attributes: { exclude: ["password"] },
  });
  return res.status(200).json({ clients });
};

exports.getClient = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await models.client.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
    });
    if (client === null)
      return res.status(404).json({ message: "Client doesn't exist " });
    return res.status(200).json(client);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "client not found" });
  }
};

exports.addClient = async (req, res, next) => {
  let { fullName, email, mobileNumber, password, companyName, createdBy } =
    req.body;
  console.log("req.body ", req.body);
  await sequelize.transaction(async t => {
    try {
      const exists = await models.client.findOne({ where: { email } });
      if (exists) {
        return res.status(409).json({ message: "Client exists" });
      }
      const client = await models.client.create(
        {
          fullName,
          email,
          mobileNumber,
          password,
          companyName,
        },
        { transaction: t }
      );
      console.log(client);
      //FIXME: Apply karans solution
      await models.user.create(
        {
          userName: fullName,
          email,
          mobileNumber,
          password,
          createdBy,
          roleName: "client",
          userId: client.dataValues.id,
        },
        { transaction: t }
      );
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "something went wrong" });
    }
  });
  return res.status(200).json({ message: "employee created" });
};

exports.deleteClient = async (req, res) => {
  const client = await models.client.update(
    { isActive: false },
    { where: { id: req.params.id } }
  );
  await models.user.update(
    { isActive: false },
    { where: { email: client.email } }
  );
  return res.status(200).json({ message: "Client deletd" });
};

exports.updateClient = async (req, res) => {
  await models.client.update(req.body, {
    where: { id: req.params.id },
  });
  console.log(client);
  // await models.user.update(req.body, { where: { email: client.email } });
  return res.status(200).json({ message: "Client updated" });
};

exports.adminDeployResource = async (req, res) => {
  const { empIds, clientId } = req.body;
  // empIds is an array of ids of employee table
  try {
    await sequelize.transaction(async t => {
      //TODO: Check if need to update emp table
      await models.employee.update(
        { isActive: false },
        {
          where: {
            id: empIds,
          },
          transaction: t,
        }
      );
      const bulkData = empIds.map(id => ({
        employeeId: id,
        clientId,
      }));
      await models.deployList
        .bulkCreate(bulkData, { transaction: t })
        .then(() => console.log("Bulk Create of deploy list"));
    });
    return res.status(200).json({ message: "resource deployed" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
};
