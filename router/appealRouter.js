const { postAppeal, getPendingAppeals, respondAppeal } = require('../controller/appealController');
const express = require('express');
const router = express.Router();

router.get('/', getPendingAppeals);
router.post('/', postAppeal);
router.post('/respond', respondAppeal);

module.exports = router;
