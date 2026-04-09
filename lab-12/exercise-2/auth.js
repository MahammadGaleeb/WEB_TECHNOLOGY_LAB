const auth = (req, res, next) => {
    const isAuthorized = true; // simulate authentication

    console.log("Auth Middleware Executed");

    if (!isAuthorized) {
        return res.status(403).send("Access Denied");
    }

    next();
};

module.exports = auth;