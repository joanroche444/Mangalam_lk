const express = require('express');
require('dotenv').config();

const app = express();
const port = 5000;
const mongoose = require('mongoose'); 
const vendorRoute = require('./Routes/vendorRoute');

mongoose
.connect(process.env.MONGO_URL)
.then(() => console.log('DB connected'))
.catch((err)=>console.log('DB not connected'))
// Sample route
//app.get('/', (req, res) => {
//  res.send('Hello, World!');
//});

app.use(express.json());  // Ensure you can parse JSON request bodies

app.use('/api/vendor', vendorRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
