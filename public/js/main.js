// Create the constants
const socket = io();
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix:true
});
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// console.log(username, room);

// emit on joining a room
socket.emit('joinroom', { username, room });

// Get Users and Room
socket.on('roomUsers', ({room, users})=>{
    outputRoomName(room);
    outputUsers(users);
});

/*
    *******************************************
    Create the functions
    *******************************************
*/

function outputUsers(users) {
    userList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}

function outputRoomName(room) {
    roomName.innerText = room;
}

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