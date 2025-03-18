const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const VendorsRouting = require('./Routes/VendorsRouting'); // Adjust the path to your route

const app = express();
const port = 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4, // Forces MongoDB to use IPv4
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB connection failed", err));

// Middleware to parse incoming JSON data
app.use(express.json());

// Use the vendor route
app.use('/api/vendor', VendorsRouting);

// Test route to check if server is working
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
