module.exports = (sequelize, DataTypes) => {
  const ResourceManagerDeployList = sequelize.define(
    "resourceManagerDeployList",
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
      tableName: "resource_manager_deploy_list",
      timestamps: false,
    }
  );
  return ResourceManagerDeployList;
};
