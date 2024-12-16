const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const getISTDate = require('../../date');

const Group = require('../../schema/Group');
const User = require('../../schema/User');

// Create Group 
// URL :-  baseURL/groups/creategroup
router.post('/creategroup', async (req, res) => {
    try {
        // Destructure details from body
        const { userName, ...groupDetails } = req.body; 

        // Check if user exists
        const user = await User.findOne({ userName: userName }, {_id : 1});
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        const date = getISTDate();

        // const user = User.findOne({_id : userId});

        const newGroup = new Group({
            ...groupDetails,
            createdAt: date,
            createdBy: user._id,
            members: [
                {
                    userId: user._id,
                    joinedAt: date,
                    role: 'Admin',
                },
            ],
        });

        await newGroup.save();

        // Send success response
        res.status(200).send({ message: "Group created successfully!" });
    } 
    catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error While Creating Group' });
    }
});

module.exports = router;