// Create the constants
const socket = io();
const chatForm = document.getElementById('chat-form');

// Create the functions

// Catch emmit event :: Message from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);
});


// Event Handlers
chatForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    //console.log(msg);

    // Emit the message to Server Side
    socket.emit('chatMessage', msg);
});

// Handle Output To DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');

    //console.log("inside: "+message);

    div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
        ${message}
    </p>`;

    document.querySelector('.chat-messages').appendChild(div);
}