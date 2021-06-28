const bcrypt = require('bcrypt'); 
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        firstName:{
            type: DataTypes.STRING,
            field: 'first_name',
            allowNull: false,
            validate: {
                len: {
                    args: [0, 30]
                }
            }
        },
        lastName:{
            type: DataTypes.STRING,
            field: 'last_name',
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
        companyName:{
            type:DataTypes.STRING,
            field:'company_name',
            allowNull:true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            field: 'is_active',
            defaultValue: true
        },
        email:{
            type:DataTypes.STRING,
            field:'email',
            allowNull:false
        },
        createdBy: {
            type: DataTypes.INTEGER,
            field: 'created_by',
        },
        modifiedBy: {
            type: DataTypes.INTEGER,
            field: 'modified_by',
        }
    }, {
        freezeTableName: true,
        tableName: 'user',
        timestamps: false
    });

    // User.associate = function(models){
    //     User.belongsToMany(models.userRole, {through:models.userRole})
    // }

    // This hook is always run before create.
    User.beforeCreate(function (user, options, cb) {
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
    User.beforeUpdate(function (user, options, cb) {
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
    User.prototype.comparePassword = function (passw, cb) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(passw, this.password, function (err, isMatch) {
                if (err) {
                    return err;
                }
                return resolve(isMatch)
            });
        });
    };

    // This will not return password, refresh token and access token.
    // User.prototype.toJSON = function () {
    //     var values = Object.assign({}, this.get());
    //     delete values.password;
    //     return values;
    // }

    // User.activeStatus = (id) => User.update({ userStatus: true }, { where: { id: id, isActive: true } });

    // User.deActiveStatus = (id) => User.update({ userStatus: false }, { where: { id: id, isActive: true } });

    return User;
}