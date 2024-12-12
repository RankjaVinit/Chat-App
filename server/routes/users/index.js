const express = require('express');
const router = express.Router();

const getAllUsers = require('./getAllUser');
//..

router.use('/', getAllUsers);
//..


module.exports = router;
