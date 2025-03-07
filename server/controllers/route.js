const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth/_route');
const erp = require('../controllers/erp/_route');
const ai = require('../controllers/ai/_route');

router.use('/auth', auth);
router.use('/erp', erp);
router.use('/ai', ai);

module.exports = router;