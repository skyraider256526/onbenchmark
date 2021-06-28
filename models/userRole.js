module.exports = (sequelize, DataType) => {
  const UserRole = sequelize.define(
    "userRole",
    {
      userId: {
        type: DataType.INTEGER,
        field: "user_id",
      },
      roleId: {
        type: DataType.INTEGER,
        field: "role_id",
      },
      isActive: {
        type: DataType.BOOLEAN,
        field: "is_active",
        defaultValue: true,
      },
    },
    {
      freezeTableName: true,
      allowNull: false,
      tableName: "user_role",
    }
  );

  // UserRole.associate = function(models){
  //     UserRole.belongsTo(models.user, {foreignKey: 'userId', as:'user'}),
  //     UserRole.belongsTo(models.resourceManager, {foreignKey: 'userId', as:'resourceManager'})
  // }

  return UserRole;
};
