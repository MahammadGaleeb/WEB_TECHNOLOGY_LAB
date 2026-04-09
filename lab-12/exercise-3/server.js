const express = require('express');
const app = express();

// Import DB connection
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Default route
app.get('/', (req, res) => {
    res.send("MongoDB CRUD API Running");
});

// Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});