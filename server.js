const express = require('express');
const path =  require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, getRoomUser, userLeave } = require('./utils/users');

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
        socket.emit('message', formatMessage(botName, 'Welcome to QuickRooms'));

        // Broadcast when a user connects: To all except the user itself
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${username} Has Joined The Chat`));

    });
    // To All Clients in general
    //io.emit();

    
    // Listen to Chat Messages
    socket.on('chatMessage', (msg)=>{
        const user = getCurrentUser(socket.id);
        
        io.to(user.room).emit('message', formatMessage(user.username,msg));
    });
    
    // Runs When Client Disconnects
    socket.on('disconnect', () =>{
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit('message', formatMessage(botName, `A ${user.username} has left the Chat`));
        }
    });

});


// Start the server at the specific port
server.listen(PORT,()=>{
    console.log(`Server Running on: http://192.168.0.6:${PORT}`);
});