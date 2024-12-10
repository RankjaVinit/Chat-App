const express = require('express');
const router = express.Router();

const User = require('../schema/User');

// to get all users
router.get('/users', async (req, res) => {
    let ans = await User.find();
    res.send(ans);
});


module.exports = router;
