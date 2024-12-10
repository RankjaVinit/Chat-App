const express = require('express');
const router = express.Router();

// Example API endpoint
// router.get('/status', (req, res) => {
//     res.json({ status: 'Server is running', timestamp: new Date() });
// });

// router.post('/message', (req, res) => {
//     const { user, message } = req.body;
//     if (!user || !message) {
//         return res.status(400).json({ error: 'Missing user or message' });
//     }
//     res.json({ success: true, user, message });
// });

module.exports = router;
