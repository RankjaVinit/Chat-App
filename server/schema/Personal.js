const mongoose = require('mongoose');
const getISTDate = require('../date');

const personalSchema = new mongoose.mongoose.Schema({
    members: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User', // Reference to user collection
                required: true,
            },
            joinedAt: {
                type: Date,
                // default: Date.now, // Timestamp when the user joined
            },
        },
    ],
    messages: [
        {
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User', // Reference to the sender
                required: true,
            },
            content: {
                type: String,
                required: true, // Message content
            },
            sentAt: {
                type: Date,
                // default: Date.now, // Timestamp of message sent
            },
        },
    ]
})

module.exports = mongoose.model('Personal' , personalSchema);