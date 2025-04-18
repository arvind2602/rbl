const express = require('express');
const router = express.Router();
const ai = require('./ai');


router.post('/create', ai.getAi);
router.get('/report', ai.generateReport);


module.exports = router;    
