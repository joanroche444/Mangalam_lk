const express = require('express');
require('dotenv').config();

const app = express();
const port = 5002;
const mongoose = require('mongoose'); 


mongoose
.connect(process.env.MONGO_URL)
.then(() => console.log('DB connected'))
.catch((err)=>console.log('DB not connected'))
// Sample route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
