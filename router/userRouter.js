const { getUser } = require('../controller/userController');
const express = require('express');
const router = express.Router();

router.get('/', getUser);

module.exports = router;
