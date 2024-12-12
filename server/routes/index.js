const express = require('express');
const router = express.Router();

const userRoutes = require('./users');
const groupRoutes = require('./groups');
//..

router.use('/users', userRoutes);
router.use('/groups', groupRoutes);
//..

module.exports = router;
