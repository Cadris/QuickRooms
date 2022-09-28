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

    socket.emit('message', 'Welcome to QuickRooms');
});


// Start the server at the specific port
server.listen(PORT,()=>{
    console.log(`Server Running on: http://192.168.0.6:${PORT}`);
});