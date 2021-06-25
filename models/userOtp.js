module.exports = (sequelize, DataTypes) => {
  const UserOtp = sequelize.define(
    "userOtp",
    {
      // attributes
      mobileNumber: {
        type: DataTypes.STRING,
        field: "mobile_number",
        allowNull: false,
      },
      otp: {
        type: DataTypes.INTEGER,
        field: "otp",
        allowNull: false,
      },
      createdTime: {
        type: DataTypes.DATE,
        field: "created_time",
      },
      expiryTime: {
        type: DataTypes.DATE,
        field: "expiry_time",
      },
      referenceCode: {
        type: DataTypes.STRING,
        field: "reference_code",
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        field: "is_verified",
        defaultValue: false,
      },
    },
    {
      freezeTableName: true,
      allowNull: false,
      tableName: "user_otp",
      timestamps: false,
    }
  );

  return UserOtp;
};
