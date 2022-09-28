const express = require('express');
const path =  require('path');
const app = express();

// constant variables
const PORT = 3000 || process.env.PORT

// set static 
app.use(express.static(path.join(__dirname, 'public')))


// Start the server at the specific port
app.listen(PORT,()=>{
    console.log(`Server Running on: 192.168.0.6:${PORT}`);
});