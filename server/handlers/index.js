const messageHandler = require("./messageHandler");
const notificationHandler = require('./notificationHandler');
const groupHandler = require('./groupHandler');


module.exports = (io, socket) => {

    messageHandler(io, socket);

    notificationHandler(io, socket);
    
    groupHandler(io, socket);

};