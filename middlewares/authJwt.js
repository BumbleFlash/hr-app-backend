const jwt = require("jsonwebtoken");
const config = require("../config/auth_config.js");

verifyToken = (res, req, next) => {
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
