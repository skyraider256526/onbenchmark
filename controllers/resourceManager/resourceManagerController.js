const models = require("../../models");
const sequelize = models.sequelize;
const Sequelize = models.Sequelize;

exports.resourceManagerDeployResource = async (req, res) => {
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
      // createing a array of object containg empId and the client id
      const bulkData = empIds.map(id => ({
        employeeId: id,
        clientId,
      }));
      await models.resourceManagerDeployList
        .bulkCreate(bulkData, { transaction: t })
        .then(() => console.log("Bulk Create of deploy list"));
    });
    return res.status(200).json({ message: "resource deployed" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Something went wrong" });
  }
};

exports.getRequestEmployeeList = async (req, res) => {
  try {
    const list = await models.empList.findAll();
    return res.status(200).json(list);
  } catch (error) {
    console.error(error);
    return res.status(400).send("Something went wrong");
  }
};
