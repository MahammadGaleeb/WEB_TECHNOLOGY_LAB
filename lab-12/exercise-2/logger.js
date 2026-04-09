const logger = (req, res, next) => {
    const time = new Date().toISOString();
    console.log(`[${time}] ${req.method} ${req.url}`);

    // Pass control to next middleware
    next();
};

module.exports = logger;