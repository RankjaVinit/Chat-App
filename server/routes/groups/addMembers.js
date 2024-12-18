const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const getISTDate = require('../../date');

const Group = require('../../schema/Group');
const User = require('../../schema/User');

// Add Member
// URL: baseURL/groups/addMember
router.post('/addMember', async (req, res) => {
    try {
        // Destructure details from body
        const { addedBy, userNameToAdd, role, groupId } = req.body;

        // Validate request body
        if (typeof addedBy !== 'string') {
            return res.status(400).send({ error: 'Invalid data type: addedBy must be a string' });
        }

        if (typeof userNameToAdd !== 'string') {
            return res.status(400).send({ error: 'Invalid data type: userNameToAdd must be a string' });
        }

        if (typeof role !== 'string') {
            return res.status(400).send({ error: 'Invalid data type: role must be a string' });
        }

        if (typeof groupId !== 'string') {
            return res.status(400).send({ error: 'Invalid data type: groupId must be a valid ObjectId' });
        }

        // Fetch group by ID
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).send({ error: 'Group not found' });
        }

        // Fetch user IDs
        const addedByUser = await User.findOne({ userName: addedBy }, { _id: 1 });
        const userToAdd = await User.findOne({ userName: userNameToAdd }, { _id: 1 });
        if (!addedByUser || !userToAdd) {
            return res.status(404).send({ error: 'User not found' });
        }

        // Check if 'addedBy' user is in the group
        const isAuthorizedToAdd = group.members.some(member => member.userId.equals(addedByUser._id));
        if (!isAuthorizedToAdd) {
            return res.status(403).send({ error: 'You are not authorized to add members to this group' });
        }

        // Check if 'userToAdd' is already a member
        const isAlreadyMember = group.members.some(member => member.userId.equals(userToAdd._id));
        if (isAlreadyMember) {
            return res.status(400).send({ error: 'User is already a member of this group' });
        }

        // Validate role
        const validRoles = ['admin', 'member'];
        if (!validRoles.includes(role)) {
            return res.status(400).send({ error: 'Invalid role' });
        }

        // Add new member to the group's members array
        const currentDate = getISTDate();
        group.members.push({
            userId: userToAdd._id,
            joinedAt: currentDate,
            role: role
        });

        // Add a message to the group's messages array
        const generateAddMessage = (addedBy, userNameToAdd) => `${addedBy} added ${userNameToAdd}`;
        group.messages.push({
            sender: addedByUser._id,
            content: generateAddMessage(addedBy, userNameToAdd),
            sentAt: currentDate
        });

        // Save updated group
        await group.save();

        // Send success response
        res.status(200).send({ message: 'Member added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error While Adding Members' });
    }
});

module.exports = router;
