module.exports = (sequelize, DataTypes) => {
  const RoleModule = sequelize.define(
    "roleModule",
    {
      // attributes
      roleId: {
        type: DataTypes.INTEGER,
        field: "role_id",
      },
      moduleId: {
        type: DataTypes.INTEGER,
        field: "module_id",
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        field: "is_active",
        defaultValue: true,
      },
    },
    {
      freezeTableName: true,
      allowNull: false,
      tableName: "role_module",
    }
  );

  RoleModule.addRoleModule = (roleId, moduleId) =>
    RoleModule.create({ roleId, moduleId });

  RoleModule.getRoleModules = roleId =>
    RoleModule.findAll({
      where: { roleId, isActive: true },
      attributes: ["moduleId"],
    });

  RoleModule.associate = function (models) {
    RoleModule.belongsTo(models.module, {
      foreignKey: "moduleId",
      as: "module",
    });
    RoleModule.belongsTo(models.role, { foreignKey: "roleId", as: "role" });
  };

  return RoleModule;
};
