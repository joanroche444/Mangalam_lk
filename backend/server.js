const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
 // Adjust the path to your route
const IncomeRoutes = require("./Routes/incomeRoutes");
const ExpenseRoutes = require("./Routes/expenseRoutes");
const DashboardRoutes = require("./Routes/dashboardRoutes");

const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const VendorsRouting = require('./Routes/VendorsRouting'); 
const userRoutes = require('./Routes/userRoutes')// Adjust the path to your route


const app = express();
const cors = require('cors')
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
app.use(cors());
/*app.use(cors({
  origin: 'http://localhost:5173/',
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-type', 'Authorization'],
  credentials: true
}))/*

// Use the vendor route*/
app.use('/api/vendor', VendorsRouting);

app.use('/api/income', IncomeRoutes);
app.use('/api/expense', ExpenseRoutes);
app.use('/api/dashboard', DashboardRoutes);

app.use('/api/user', userRoutes); // Use the user route


// Test route to check if server is working
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
