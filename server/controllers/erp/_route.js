const express = require('express');
const router = express.Router();
const erp = require('./erp');

router.post('/create', erp.postErp);
router.get('/read/:user_uuid', erp.getErp);
router.put('/update/:user_uuid', erp.updateErp);
router.delete('/delete/:user_uuid', erp.deleteErp);


module.exports = router;

