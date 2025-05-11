const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');



 // Adjust the path to your route
const IncomeRoutes = require("./Routes/incomeRoutes");
const ExpenseRoutes = require("./Routes/expenseRoutes");
const DashboardRoutes = require("./Routes/dashboardRoutes");

const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const VendorsRouting = require('./Routes/VendorsRouting'); 
const userRoutes = require('./Routes/userRoutes')// Adjust the path to your route


const projectRoutes = require('./routes/projectRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const seatingRoutes = require('./routes/seatingRoutes');
const GuestRoutes = require('./Routes/GuestRoutes');


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4, // Forces MongoDB to use IPv4
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB connection failed", err));


// Middleware
app.use(cors());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
})); // Use CORS options

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/seating', seatingRoutes);
app.use('/api/guests', GuestRoutes)

// Test

app.use('/api/income', IncomeRoutes);
app.use('/api/expense', ExpenseRoutes);
app.use('/api/dashboard', DashboardRoutes);

app.use('/api/user', userRoutes); // Use the user route


// Test route to check if server is working

app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Mongo connection + start
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('DB connection failed:', err.message);
  });
