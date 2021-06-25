module.exports = (sequelize, DataTypes) => {
  const Entity = sequelize.define(
    "entity",
    {
      // attributes
      entityName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      moduleId: {
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
      tableName: "entity",
    }
  );

  Entity.associate = function (models) {
    Entity.belongsTo(models.module, { foreignKey: "moduleId", as: "module" });
    Entity.hasMany(models.permission, {
      foreignKey: "entityId",
      as: "permission",
    });
  };

  return Entity;
};
