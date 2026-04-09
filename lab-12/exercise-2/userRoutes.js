const express = require('express');
const router = express.Router();

// Middleware 1
const middleware1 = (req, res, next) => {
    console.log("Middleware 1 executed");
    next();
};

// Middleware 2
const middleware2 = (req, res, next) => {
    console.log("Middleware 2 executed");
    next();
};

// Route with middleware chaining
router.get('/', middleware1, middleware2, (req, res) => {
    res.send("User Route Accessed");
});

// Another route
router.post('/', (req, res) => {
    res.json({
        message: "User Created",
        data: req.body
    });
});

module.exports = router;