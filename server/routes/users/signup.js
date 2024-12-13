const express = require('express');
const router = express.Router();

const argon2 = require('argon2');

const getISTDate = require('../../date');
const User = require('../../schema/User');

// Signup 
// URL :-  baseURL/users/signup
router.post('/signup', async (req, res) => {
    try {
        // get all user details from body
        const { confirmPassword, password, ...userDetails } = req.body;

        // Check here if any user have same name or mobileNo : 
        // if any return msg ... 

        // Check if the password matches the confirmation
        if( password !== confirmPassword ){
            return res.status(401).send({ message: "Password don't match, please try again." });
        }

        // Hash the password
        const hashedPassword = await argon2.hash( password );
        
        const date = getISTDate();

        // Create the user with the current timestamp
        const newUser = new User({
            ...userDetails,
            password : hashedPassword,
            createdAt : date
        });

        // Save the new user to the database
        await newUser.save();

        // Send success response
        res.status(200).send({ message: "User created successfully!" });

    } 
    catch (error) {
        console.log(error);
        res.status(500).send({ error: 'An error occurred during signup. Please try again later.' });
    }
});


module.exports = router;