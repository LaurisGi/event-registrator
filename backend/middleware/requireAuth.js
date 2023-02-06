const jwt = require('jsonwebtoken');
require('dotenv').config();

    const getUserFromToken = (req) => {
        const token = req.headers.authorization.split(' ')[1];
        console.log(token)
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return user;
      }
      
      const requireAuth = (req, res, next) => {
        try {
            getUserFromToken(req);
            next();
        } catch(e) {
            res.send({ error: 'Invalid Token' });
        }
      }


 module.exports = requireAuth, getUserFromToken