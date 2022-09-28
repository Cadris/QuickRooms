const express = require('express');
const path =  require('path');
const http = require('http');
const socketio = require('socket.io');

// constant variables
const PORT = 3000 || process.env.PORT
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// set static 
app.use(express.static(path.join(__dirname, 'public')))

// run when clients connect
io.on('connection', socket => {
    console.log('New Web Socket Connection...');

    // To Single Client
    socket.emit('message', 'Welcome to QuickRooms');

    // Broadcast when a user connects: To all except the user itself
    socket.broadcast.emit('message', 'A User Has Joined The Chat');

    // To All Clients in general
    //io.emit();

    // Runs When Client Disconnects
    socket.on('disconnect', () =>{
        io.emit('message', 'A User has left the Chat')
    });

    // Listen to Chat Messages
    socket.on('chatMessage', (msg)=>{
        console.log("Server side Message: "+msg);
    });

});


// Start the server at the specific port
server.listen(PORT,()=>{
    console.log(`Server Running on: http://192.168.0.6:${PORT}`);
});