const models = require("../../models");
const sequelize = models.sequelize;
const Sequelize = models.Sequelize;

// add employee
exports.addEmployee = async (req, res, next) => {
  let {
    firstName,
    email,
    lastName,
    mobileNumber,
    technology,
    yearOfExperience,
    currentLocation,
  } = req.body;
  console.log("req.body ", req.body);
  await sequelize.transaction(async (t) => {
    const emp = await models.employee.create(
      {
        firstName,
        email,
        lastName,
        mobileNumber,
        technology,
        yearOfExperience,
        currentLocation,
      },
      { transaction: t }
    );
  });
  return res.json({ message: "employee created" });
};

// update employee
exports.updateEmployee = async (req, res, next) => {
  let {
    firstName,
    email,
    lastName,
    mobileNumber,
    technology,
    yearOfExperience,
    currentLocation,
  } = req.body;
  let id = req.params.id;
  console.log("req.body ", req.body);
  await sequelize.transaction(async (t) => {
    const Emp = await models.employee.findOne({ where: { id } });
    console.log("emp found for update ", Emp);
    await Emp.update(
      {
        firstName,
        email,
        lastName,
        mobileNumber,
        technology,
        yearOfExperience,
        currentLocation,
      },
      { transaction: t }
    );
  });
  return res.json({ message: "employee updated" });
};

// delete employee
exports.deleteEmployee = async (req, res, next) => {
    let id = req.params.id;
    await sequelize.transaction(async t => {
        const emp = await models.employee.update({isActive: false}, {where:{id}})
    })
    return res.status(200).json({message:'employee deleted'})
}


// get employee by id
exports.getEmployeeById = async (req, res, next) => {
    let id = req.params.id
    const empResult = await models.employee.findOne({
        where:{id, isActive: true}
    })
    if(empResult){
        console.log("emp result from emp ", empResult)
        return res.status(200).json({message:'user detail fetch successfully', empResult})
    }else{
        return res.status(401).json({message:'Data not found'})
    }
}

// get all employee
exports.getAllEmployee = async (req, res, next) => {
    const emp = await models.employee.findAll({where: { isActive:true }})
    console.log(emp)
    if(emp.length > 0){
        return res.status(200).json({message:'all employee detailed fetched successfully', emp})
    }else{
        return res.status(200).json({message:'no employee found'})
    }
}

// get emp list selected by client
exports.getEmployeeListOfClient = async (req, res, next) => {
    const empList = await models.empList.findAll()
    console.log(empList[0].dataValues.listOfEmp)
    if(empList.length > 0){
        return res.status(200).json({message:'selected candidate list by clients', empList})
    }else{
        return res.status(401).json({message:'client has not selected any candidate yet.'})
    }
}