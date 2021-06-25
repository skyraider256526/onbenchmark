module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define(
    "permission",
    {
      // attributes
      actionName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      systemInfo: {
        type: DataTypes.JSON,
      },
      entityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      freezeTableName: true,
      allowNull: false,
      tableName: "permission",
    }
  );

  Permission.associate = function (models) {
    Permission.belongsTo(models.entity, {
      foreignKey: "entityId",
      as: "entity",
    });
    Permission.belongsToMany(models.role, { through: models.rolePermission });
    //Permission.hasMany(models.permissionSystemInfo,{foreignKey:'permissionId', as:'systemInfo'});
  };

  return Permission;
};
