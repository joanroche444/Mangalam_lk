const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const VendorsRouting = require('./Routes/VendorsRouting'); // Adjust the path to your route
const Incomerouting =require('./Routes/Incomerouting');
const Expenserouting=require('./Routes/Expenserouting')
const app = express();
const port = 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log('DB connection failed', err));

// Middleware to parse incoming JSON data
app.use(express.json());
app.use(cors());
// Use the vendor route
app.use('/api/vendor', VendorsRouting);
app.use('/api/income', Incomerouting);
app.use('/api/expense', Expenserouting);
// Test route to check if server is working
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
