const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), 'secretkey');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = verifyToken;