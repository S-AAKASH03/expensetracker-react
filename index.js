const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://aakashasv2413:qQn1Ay3vBvqordek@expense.33nwdt2.mongodb.net/?retryWrites=true&w=majority&appName=expense', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch(err => {
  console.log('Error connecting to MongoDB:', err);
});

// Routes
const expenseRouter = require('./routes/expenses');
app.use('/expenses', expenseRouter);

// Start the server
app.listen(5000, () => {
  console.log(`Server is running on port: ${port}`);
});
