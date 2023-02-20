const express = require('express');
const router = express.Router();

console.log('Inside routes');

router.use(require('./user.routes'));

module.exports = router;