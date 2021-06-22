const models = require('../../models');
const sequelize = models.sequelize;
const Sequelize = models.Sequelize;
const Op = Sequelize.Op;
const jwt = require('jsonwebtoken');
const { JWT_EXPIRATIONTIME, JWT_SECRETKEY } = require('../../utlis/constant');

exports.userLogin = async (req, res, next) => {
    let { username, password } = req.body;
    console.log("req.body ", req.body)
    let checkUser = await models.user.findOne({where:{
        [Op.or]:[
            {
                email:username
            },
            {
                mobileNumber: username
            }
        ]
    }})
    console.log("check user: ", checkUser)

    if(!checkUser){
        res.status(401).json({ message: 'you have entered incorrect username or password'})
    }else{
        let userDetail = await checkUser.comparePassword(password);
        console.log('user detail ', userDetail)
        if(userDetail === true){
            console.log("check role of user ", checkUser.dataValues.id)
            let checkRole = await models.role.findOne({where:{role_id:checkUser.dataValues.id}})
            console.log("check role ", checkRole)
            if(checkRole.roleName === 'admin'){
                let Token = jwt.sign({
                    id: checkUser.dataValues.id,
                    mobile: checkUser.dataValues.mobileNumber,
                    userName: checkUser.dataValues.userName,
                    isAdmin:true
                },
                    JWT_SECRETKEY, {
                    expiresIn: JWT_EXPIRATIONTIME
                });
                console.log("token ", Token)
                const decoded = jwt.verify(Token, JWT_SECRETKEY);
                const createdTime = new Date(decoded.iat * 1000).toGMTString();
                const expiryTime = new Date(decoded.exp * 1000).toGMTString();
                models.logger.create({
                    userId: decoded.id,
                    token: Token,
                    expiryDate: expiryTime,
                    createdDate: createdTime
                });
                res.status(200).json({ message:"login successful"})
            }else{
                let Token = jwt.sign({
                    id: checkUser.dataValues.id,
                    mobile: checkUser.dataValues.mobileNumber,
                    userName: checkUser.dataValues.userName,
                    isAdmin:false
                },
                    JWT_SECRETKEY, {
                    expiresIn: JWT_EXPIRATIONTIME
                });
                console.log("token ", Token)
                const decoded = jwt.verify(Token, JWT_SECRETKEY);
                const createdTime = new Date(decoded.iat * 1000).toGMTString();
                const expiryTime = new Date(decoded.exp * 1000).toGMTString();
                models.logger.create({
                    userId: decoded.id,
                    token: Token,
                    expiryDate: expiryTime,
                    createdDate: createdTime
                });
                res.status(200).json({ message:"login successful"})
            }
        }else{
            return res.status(401).json({ message:"you have entered incorrect username or password"})
        }
    }
}

exports.logout = async (req, res, next) => {
    let token = await req.headers.authorization.split(" ")[1];
    let logout = await models.logger.destroy({ where: { token: token } });

    return res.status(202).json({ message: `logout successfull` })
}