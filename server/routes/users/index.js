const express = require('express');
const router = express.Router();

const getAllUsers = require('./getAllUser');
const login = require('./login');
const signup = require('./signup');
//..

router.use('/', getAllUsers);
router.use('/', login);
router.use('/', signup);
//..


module.exports = router;
