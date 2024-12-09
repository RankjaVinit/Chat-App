// .. 

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName : {type : String , unique : true , required : true}, //User Name describes here
    password : {type : String , required : true}, //Password is used to login
    about : {type : String}, //It is about a user 
    description : {type : String}, // It describes your details if you want
    mobileNo : {type : String , required : true , unique : true}, // it is your mobile no and it is compulsory
    notification : [
        {
            _id : {type : String , required : true}, // id of user
            message : {}, // It describes in short about message
            isRead : {type : Boolean , default : false}, // It gives boolean if message is readed or not
            timeStamp : {type : Date , default : Date.now} //It gives time of message
        }
    ]
});

module.exports = mongoose.model('User' , userSchema);