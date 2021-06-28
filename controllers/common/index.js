const models = require("../../models");
const sequelize = models.sequelize;

exports.deployResource = async (req, res) => {
  const { empIds, clientId } = req.body;
  // empIds is an array of ids of employee table
  await sequelize.transaction(async t => {
    //TODO: Check if need to update emp table
    await models.empList.update(
      { isActive: false },
      {
        where: {
          id: empIds,
        },
        transaction: t,
      }
    );
    await models.deployList.create(
      {
        listOfEmp: empIds,
        clientId,
      },
      { transaction: t }
    );
  });
};
