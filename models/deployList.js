module.exports = (sequelize, DataTypes) => {
  const DeployList = sequelize.define(
    "deployList",
    {
      employeeId: {
        type: DataTypes.INTEGER,
        field: "employee_id",
        allowNull: false,
      },
      clientId: {
        type: DataTypes.INTEGER,
        field: "client_id",
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      tableName: "deploy_list",
      timestamps: false,
    }
  );
  return DeployList;
};
