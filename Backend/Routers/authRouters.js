const router = require('express').Router();
const { signUpValidation, LoginValidation } = require('../Middlewares/AuthValidation');
const { signUp, login } = require('../Controllers/AuthControllers')

router.post('/login', LoginValidation, login);
router.post('/signup', signUpValidation, signUp);

module.exports = router;