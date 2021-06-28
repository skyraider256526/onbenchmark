module.exports = (sequelize, DataTypes) => {
    const EmpList = sequelize.define('empList', {
        listOfEmp:{
            type:DataTypes.ARRAY(DataTypes.INTEGER),
            field:'list_of_emp',
            defaultValue: []
        }
        ,createdBy:{
            type:DataTypes.INTEGER,
            field:'created_by',
            allowNull: false
        }
    }, {
        freezeTableName: true,
        tableName: 'emp_list',
        timestamps: false
    });
    return EmpList;
}