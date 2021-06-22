const { validationResult } = require('express-validator'); 

// middleware for validation error.

module.exports = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.errors[0].msg
        })
    } else {
        next();
    }
};