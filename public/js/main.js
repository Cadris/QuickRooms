// Create the constants
const socket = io();
const chatForm = document.getElementById('chat-form');

// Create the functions

// Catch emmit event
socket.on('message', message => {
    console.log(message);
});


// Event Handlers
chatForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    console.log(msg);

    // Emit the message to Server Side
    socket.emit('chatMessage', msg);
});