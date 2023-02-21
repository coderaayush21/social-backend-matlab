const express = require('express');
const router = express.Router();

const { friendController } = require('../controllers');

const { friendValidations } = require('../validations');

const validate = require('../middlewares/validation.middleware');
const auth = require('../middlewares/auth.middleware');

router.post('/send-request', auth, validate(friendValidations.friendRequestSchema), friendController.sendFriendRequestController);
router.patch('/accept-request', auth, validate(friendValidations.friendRequestSchema), friendController.acceptFriendRequestController);

module.exports = router;