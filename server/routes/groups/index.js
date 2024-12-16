const express = require('express');
const router = express.Router();

const createGroup = require('./createGroup');
//..

router.use('', createGroup);
//..

module.exports = router;
