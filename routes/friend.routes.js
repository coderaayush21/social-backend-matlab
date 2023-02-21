const express = require('express');
const router = express.Router();

const { friendController } = require('../controllers');

const { friendValidations } = require('../validations');

const validate = require('../middlewares/validation.middleware');
const auth = require('../middlewares/auth.middleware');

router.post('/send-request', auth, validate(friendValidations.friendRequestSchema), friendController.sendFriendRequestController);
router.patch('/accept-request', auth, validate(friendValidations.friendRequestSchema), friendController.acceptFriendRequestController);
router.patch('/reject-request', auth, validate(friendValidations.friendRequestSchema), friendController.rejectFriendRequestController);
router.get('/view-friends', auth, validate(friendValidations.friendRequestSchema), friendController.viewFriendsController);

module.exports = router;