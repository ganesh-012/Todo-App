const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

function middleWare(req,res,next){
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({ msg: 'Authorization header missing' });
    }
    const response = authorization.split(' ');
    const token = response[1];
    try {
       const decoded = jwt.verify(token, JWT_SECRET);
       req.username = decoded.username;
       next();
    } catch (err) {
        return res.status(404).json({ msg: 'Invalid token' });
    }
}

module.exports = {
    middleWare
}