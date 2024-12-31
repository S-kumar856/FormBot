const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token, authorization denied' });
    }
    console.log(token)
    try {
        // Verify the token and decode the user info
        const decoded = jwt.verify(token, process.env.SECRET_JWT);
        req.user = decoded;  // Set the decoded user in the request
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Token is not valid' });
        console.log(error)
    }
};

module.exports = authMiddleware;
