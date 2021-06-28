const bcrypt = require('bcrypt'); 
module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define('client', {
        fullName:{
            type: DataTypes.STRING,
            field: 'full_name',
            allowNull: false,
            validate: {
                len: {
                    args: [0, 30]
                }
            }
        },
        password: {
            type: DataTypes.TEXT,
            field: 'password',
            allowNull: false,
        },
        mobileNumber:{
            type: DataTypes.STRING,
            field:'mobile_number',
            allowNull:false
        },
        email:{
            type: DataTypes.STRING,
            field: 'email',
            allowNull: false,
            validate: {
                len: {
                    args: [0, 30]
                }
            }
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            field: 'is_active',
            defaultValue: true
        },
        createdBy: {
            type: DataTypes.INTEGER,
            field: 'created_by',
        },
        modifiedBy: {
            type: DataTypes.INTEGER,
            field: 'modified_by',
        },
        companyName:{
            type:DataTypes.STRING,
            field:'company_name',
            allowNull:false
        }
    }, {
        freezeTableName: true,
        tableName: 'client',
        timestamps: false
    });

    // User.associate = function(models){
    //     User.belongsToMany(models.userRole, {through:models.userRole})
    // }

    // This hook is always run before create.
    Client.beforeCreate(function (user, options, cb) {
        if (user.password) {
            return new Promise((resolve, reject) => {
                bcrypt.genSalt(10, function (err, salt) {
                    if (err) {
                        return err;
                    }
                    bcrypt.hash(user.password, salt, function (err, hash) {
                        if (err) {
                            return err;
                        }
                        user.password = hash;
                        return resolve(user, options);
                    });
                });
            });
        }
    });

    // This hook is always run before update.
    Client.beforeUpdate(function (user, options, cb) {
        if (user.password) {
            return new Promise((resolve, reject) => {
                bcrypt.genSalt(10, function (err, salt) {
                    if (err) {
                        return err;
                    }
                    bcrypt.hash(user.password, salt, function (err, hash) {
                        if (err) {
                            return err;
                        }
                        user.password = hash;
                        return resolve(user, options);
                    });
                });
            });
        }
    });

    // Instance method for comparing password.
    Client.prototype.comparePassword = function (passw, cb) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(passw, this.password, function (err, isMatch) {
                if (err) {
                    return err;
                }
                return resolve(isMatch)
            });
        });
    };

    return Client;
}