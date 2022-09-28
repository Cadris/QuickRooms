// Create the constants
const socket = io();

// Create the functions

// Catch emmit event
socket.on('message', message => {
    console.log(message);
});