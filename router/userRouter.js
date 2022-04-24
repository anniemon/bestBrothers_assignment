const { getMatchedUser } = require('../controller/userController');
const express = require('express');
const router = express.Router();

router.get('/', getMatchedUser);

module.exports = router;
