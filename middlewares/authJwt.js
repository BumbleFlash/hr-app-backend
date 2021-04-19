const jwt = require("jsonwebtoken");
const config = require("../config/auth_config.js");

/**
 * Function to verify the Java Web token. Used as middleware function for APIs
 * that request employee records.
 * @param req - Request object.
 * @param res - Response object.
 * @param next - Pattern to pass control to the next middleware function.
 */
verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({message: "Please provide a token"});
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({message: "Not Authorized"});
        }
        req.userId = decoded.id;
        next();
    })
};

module.exports = verifyToken;
