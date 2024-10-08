const jwt = require('jsonwebtoken');
const config = process.env;
const verifyToken = (req, res, next)=> {
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY || "9FbpyQaOdS4/aWtRYEw3d8CzKlgZbUwNfPEfIqaVErE=");
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
}

module.exports = verifyToken