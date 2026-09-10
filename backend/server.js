const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes Mount (Ye lines lazmi check karo)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/blogs', require('./routes/blog'));

// Test Route
app.get('/', (req, res) => {
    res.send('API is running successfully...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});