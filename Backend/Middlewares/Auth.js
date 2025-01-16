const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const authjwtToken = req.headers['authorization'];
    if (!authjwtToken) {
        return res.status(401).json({ message: "Token not provided", success: false });
    }
    try {
        const decoded = jwt.verify(authjwtToken, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Unauthorized JWT token Wrong or Expired.", success: false });
    }
}

module.exports = ensureAuthenticated;