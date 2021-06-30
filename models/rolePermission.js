module.exports = (sequelize, DataTypes) => {
  const RolePermission = sequelize.define(
    "rolePermission",
    {
      // attributes
      roleId: {
        type: DataTypes.INTEGER,
        field: "role_id",
      },
      permissionId: {
        type: DataTypes.INTEGER,
        field: "permission_id",
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
      tableName: "role_permission",
    }
  );

  RolePermission.associate = function (models) {
    RolePermission.belongsTo(models.role, { foreignKey: "roleId", as: "role" });
    RolePermission.belongsTo(models.permission, {
      foreignKey: "permissionId",
      as: "permission",
    });
  };

  RolePermission.activeStatus = id =>
    RolePermission.update({ isActive: true }, { where: { role_id: id } });

  RolePermission.deActiveStatus = id =>
    RolePermission.update({ isActive: false }, { where: { role_id: id } });

  return RolePermission;
};
