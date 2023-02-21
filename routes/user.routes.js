const express = require('express');
const router = express.Router();

const { userController } = require('../controllers');

const { userValidations } = require('../validations');

const validate = require('../middlewares/validation.middleware');
const auth = require('../middlewares/auth.middleware');

router.post('/register', validate(userValidations.registerUserSchema), userController.registerUserController);
router.post('/login', validate(userValidations.registerUserSchema), userController.loginUserController);

module.exports = router;   