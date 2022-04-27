const { searchUser } = require('../controller/userController');
const express = require('express');
const router = express.Router();

router.get('/', searchUser);

module.exports = router;
