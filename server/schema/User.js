const getISTDate = require('../date');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, unique: true, required: true, trim: true }, //User Name describes here
    password: { type: String, required: true, trim: true }, //Password is used to login
    about: { type: String, trim: true }, //It is about a user 
    description: { type: String, trim: true }, // It describes your details if you want
    mobileNo: {
        type: String, required: true, unique: true
        // , match : /^[0-9]{10}$/   //This is mobile pattern
    }, // it is your mobile no and it is compulsory
    notification: [
        {
            _id: { type: String, required: true }, // id of user
            message: {}, // It describes in short about message
            isRead: { type: Boolean, default: false }, // It gives boolean if message is readed or not
            timeStamp: { type: Date, default: Date.now } //It gives time of message
        }
    ],
    isOnline : {type : Boolean, default : false},
    lastSeen : {type : Date , default : Date.now}
}, { timestamps: true }); // Add 'createAt' and 'updatedAt' fields

module.exports = mongoose.model('User', userSchema);