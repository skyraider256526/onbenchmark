module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "employee",
    {
      firstName: {
        type: DataTypes.STRING,
        field: "first_name",
        allowNull: false,
        validate: {
          len: {
            args: [0, 30],
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        field: "last_name",
        allowNull: false,
        validate: {
          len: {
            args: [0, 30],
          },
        },
      },
      mobileNumber: {
        type: DataTypes.STRING,
        field: "mobile_number",
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        field: "email",
        allowNull: false,
        validate: {
          len: {
            args: [0, 30],
          },
        },
      },
      technology: {
        type: DataTypes.STRING,
        field: "technology",
        allowNull: false,
      },
      yearOfExperience: {
        type: DataTypes.STRING,
        field: "year_of_experience",
        allowNull: false,
      },
      currentLocation: {
        type: DataTypes.STRING,
        field: "current_location",
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        field: "is_active",
        defaultValue: true,
      },
      resumePdf: {
        type: DataTypes.BLOB,
        field: "resume_pdf",
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      tableName: "employee",
      timestamps: false,
    }
  );

  // User.associate = function(models){
  //     User.belongsToMany(models.userRole, {through:models.userRole})
  // }

  return Employee;
};
