module.exports = (sequelize, DataTypes) => {
  const DeployList = sequelize.define(
    "deployList",
    {
      listOfEmp: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        field: "list_of_emp",
        defaultValue: [],
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
