require('dotenv').config(); // Load environment variables
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./database/database');
const registerSocketHandlers = require("./handlers");
const User = require('./schema/User');
const Group = require('./schema/Group');
const Personal = require('./schema/Personal');


// Connect to MongoDB
connectDB();


// Initialize Express app
const app = express();


// Create HTTP server and Socket.IO server
const server = http.createServer(app);
const io = new Server(server);


// Sockets
io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    registerSocketHandlers(io, socket);

});

let user = new User({
    userName: 'ergds',
    password: 'asg',
    about: 'aseg',
    description: 'aksjd;oivaowjegnv aweht auierhta',
    mobileNo: '1234178909',
    notification: [],
    isOnline : false,
});

console.log(user);

user.save();

// Start the server
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
