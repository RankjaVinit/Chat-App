const express = require('express');
const router = express.Router();

const createGroup = require('./createGroup');
const addMember = require('./addMembers');
//..

router.use('', createGroup);
router.use('', addMember);
//..

module.exports = router;
