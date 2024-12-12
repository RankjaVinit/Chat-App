const express = require('express');
const router = express.Router();

const User = require('../../schema/User');

// Login 
// URL :-  baseURL/users/login
router.get('/login', async (req, res) => {
    try {

        // Destructure login details from body
        const { userName, password } = req.body; 

        // Fetch the user from the database
        const user = await User.findOne({ userName : userName });
    
        // If user is not found
        if(!user){
            res.status(404).send({ message: "User not found" });
        }    

        // Validate the password
        if (user.password !== password) {
            res.status(401).send({ message: "Incorrect Password" });
        }

        // Exclude password from the response
        const { password: _, ...userDetails } = user._doc;

        // Send the user details as response
        res.status(200).send(userDetails);

    } 
    catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error fetching users' });
    }

});

module.exports = router;