require('dotenv').config();

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const Headers = req.headers;
        if (Headers.authorization == null)
            return res.status(404).json({
                message: "need Authorization",
            });
        const token = Headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
        req.userData = decoded;
        next();
    } catch (err) {
        res.status(403).json({
            message: err.message,
            request: {
                type: "POST",
                url: "http://localhost:3000/auth/refreshToken",
                body: {
                    token: "refreshToken"
                }
            }
        });
    }
};