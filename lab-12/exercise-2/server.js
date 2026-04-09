const express = require('express');
const app = express();

// Built-in middleware (JSON parsing)
app.use(express.json());

// Import middleware
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');

// GLOBAL MIDDLEWARE
app.use(logger);

// Import routes
const userRoutes = require('./routes/userRoutes');

// ROUTE-LEVEL MIDDLEWARE (auth applied only here)
app.use('/api/users', auth, userRoutes);

// Default route
app.get('/', (req, res) => {
    res.send("Middleware Demo Server Running");
});

// Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});