// ..

const mongoose = require('mongoose');

const groupSchema = new mongoose.mongoose.Schema({
    groupName: {
        type: String,
        required: true,
        trim: true, // Removes extra spaces
    },
    description: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Timestamp of group creation
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user who created the group
        required: true,
    },
    members: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User', // Reference to user collection
                required: true,
            },
            joinedAt: {
                type: Date,
                default: Date.now, // Timestamp when the user joined
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
                default: Date.now, // Timestamp of message sent
            },
        },
    ],
});

module.exports = mongoose.model('Group' , groupSchema);