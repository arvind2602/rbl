const express = require('express');
const router = express.Router();
const ai = require('./ai');


router.get('/create', ai.getAi);


module.exports = router;    
