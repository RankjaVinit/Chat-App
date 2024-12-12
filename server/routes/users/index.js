const express = require('express');
const router = express.Router();

const getAllUsers = require('./getAllUser');
const login = require('./login');
//..

router.use('/', getAllUsers);
router.use('/', login);
//..


module.exports = router;
