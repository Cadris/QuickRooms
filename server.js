const express = require('express');
const path =  require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser } = require('./utils/users');

// constant variables
const PORT = 3000 || process.env.PORT
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const botName = 'ChatCord Bot';


// set static 
app.use(express.static(path.join(__dirname, 'public')))

// run when clients connect
io.on('connection', socket => {
    console.log('New Web Socket Connection...');

    socket.on('joinroom', ({ username, room })=>{
        // Adding a user to room
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        // To Single Client
        socket.emit('message', formatMessage(username, 'Welcome to QuickRooms'));

        // Broadcast when a user connects: To all except the user itself
        socket.broadcast.to(user.room).emit('message', formatMessage(username, `${username} Has Joined The Chat`));

    });
    // To All Clients in general
    //io.emit();

    
    // Listen to Chat Messages
    socket.on('chatMessage', (msg)=>{
        console.log("Server side Message: "+msg);
        
        io.emit('message', formatMessage('USER',msg));
    });
    
    // Runs When Client Disconnects
    socket.on('disconnect', () =>{
        io.emit('message', formatMessage(botName, 'A User has left the Chat'));
    });

});


// Start the server at the specific port
server.listen(PORT,()=>{
    console.log(`Server Running on: http://192.168.0.6:${PORT}`);
});