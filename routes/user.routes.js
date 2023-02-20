const express = require('express');
const router = express.Router();

const { userController } = require('../controllers');

const { userValidations } = require('../validations');

const validate = require('../middlewares/validation.middleware');
const validateParams = require('../middlewares/validateparams.middleware');
const auth = require('../middlewares/auth.middleware');

router.post('/register', validate(userValidations.registerUserSchema), userController.registerUserController);
router.post('/login', validate(userValidations.registerUserSchema), userController.loginUserController);
router.patch('/send-request/:fromid/:toid', auth, validateParams(userValidations.friendRequestSchema), userController.sendFriendRequestController);
router.get('/view-requests/:id', auth, userController.viewFriendRequestsConroller);
router.patch('/accept-request/:id', auth, userController.acceptFriendRequestController);
router.patch('/reject-request/:id', auth, userController.rejectFriendRequestController);
router.get('/view-friends/:id', auth, userController.viewAllFriendsController);

module.exports = router;