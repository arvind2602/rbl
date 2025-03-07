const express = require('express');
const router = express.Router();
const auth = require('./auth');

router.use('/register', auth.Register);
router.use('/login', auth.Login);


module.exports = router;
