// Create the constants
const socket = io();
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix:true
})

// console.log(username, room);

// emit on joining a room
socket.emit('joinroom', { username, room });

/*
    *******************************************
    Create the functions
    *******************************************
*/

// Catch emmit event :: Message from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    // scroll chat to down 
    chatMessages.scrollTop = chatMessages.scrollHeight;
});


// Event Handlers
chatForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const msg = e.target.elements.msg.value;
    e.target.elements.msg.value=null;
    e.target.elements.msg.focus();

    //console.log(msg);

    // Emit the message to Server Side
    socket.emit('chatMessage', msg);
});

// Handle Output To DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');

    //console.log("inside: "+message);

    div.innerHTML = `<p class="meta">${message.username}<span style="margin-left:5px">${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;

    document.querySelector('.chat-messages').appendChild(div);
}