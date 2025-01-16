const Joi = require("joi")

const signUpValidation = (req, res, next) => {
    const Schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(255).required()
    });
    const { error, value } = Schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message, success: false });
    }
    next();
}

const LoginValidation = (req, res, next) => {
    const Schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(255).required()
    });
    const { error, value } = Schema.validate(req.body);
    if (error) {
        return res.status(406).json({ message: error.details[0].message, success: false });
    }
    next();
}


module.exports = {
    signUpValidation,
    LoginValidation
}