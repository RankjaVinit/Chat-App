const mongoose = require('mongoose');
const getISTDate = require('../date');

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
        // default: Date.now, // Timestamp of group creation
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
                // default: Date.now, // Timestamp when the user joined
            },
            role: {
                type: String
            }
        }
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
            }
        }
    ],
    setting: {
        membersCanChangeName: {
            type: Boolean,
            required: true,
            default: true, // Defines if members can change group name/icon/description
        },
        membersCanSendMessage: {
            type: Boolean,
            required: true,
            default: true, // Defines if members can send messages
        },
        membersCanAddMembers: {
            type: Boolean,
            required: true,
            default: true, // Defines if members can add/remove/change roles of other members
        },
        
    }
});

module.exports = mongoose.model('Group' , groupSchema);