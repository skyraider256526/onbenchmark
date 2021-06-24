const models = require("../../models");
const sequelize = models.sequelize;
const Sequelize = models.Sequelize;

exports.addEmpList = async (req, res, next) => {
  let { empList, id } = req.body;
  // let id = req.params.id;
  if (empList.length > 0) {
    const list = await models.empList.create({
      listOfEmp: empList,
      createdBy: id,
    });
    console.log(list);
    return res
      .status(200)
      .json({ message: "list is forwarded to resource manager successfully" });
  }
};
