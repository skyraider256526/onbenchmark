module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('role', {
        role_id:{
            type: DataTypes.INTEGER,
            field: 'role_id',
            allowNull: false,
            unique: true
        },
        roleName: {
            type: DataTypes.STRING,
            field: 'role_name',
            allowNull: false,
        },
        description:{
            type: DataTypes.TEXT,
            field: 'description',
            allowNull: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            field: 'status',
            defaultValue: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            field: 'is_active',
            defaultValue: true,
        },
        createdBy: {
            type: DataTypes.INTEGER,
            field: 'created_by',
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            field: 'updated_by',
        },
    }, {
        freezeTableName: true,
        allowNull: false,
        tableName: 'role',
    });

    //Find Role name
    Role.findUniqueRole = (roleName) => Role.findOne({ where: { roleName } });

    //function_to_remove_group
    // Role.removeRole = (id) => Role.update({ isActive: false }, { where: { id: id, isActive: true } });

    // Role.addRole = (role_id,roleName, description, createdBy, updatedBy ) => Role.create({role_id,roleName, description, createdBy, updatedBy});

    // Role.updateRole = (roleName, description, updatedBy, id ) => Role.update({roleName, description, updatedBy}, {where: { id }});

    // Role.getAllRole = () => Role.findAll({ where: { isActive: true }, order: [['id', 'ASC']] });

    // Role.getRoleById = (id) => Role.findOne({ where: { isActive: true ,id}});

    // Role.deleteRole = (id) => Role.update({ isActive: false },{ where: { id}});

    // Role.associate = function(models) {
    //     Role.belongsToMany(models.user,{through: models.userRole});
    //     Role.belongsTo(models.user,{ foreignKey: 'createdBy', as: 'createdByUser' });
    //     Role.belongsTo(models.user,{ foreignKey: 'updatedBy', as: 'updatedByUser' });
    // }

    return Role;
}