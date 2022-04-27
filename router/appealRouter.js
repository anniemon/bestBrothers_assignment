const { postAppeal, getPendingAppeals, respondAppeal } = require('../controller/appealController');
const express = require('express');
const router = express.Router();

router.get('/', getPendingAppeals);
router.post('/', postAppeal);
router.post('/response', respondAppeal);

module.exports = router;
