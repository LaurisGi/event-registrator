const jwt = require('jsonwebtoken');
require('dotenv').config();

      
      const requireAuth = (req, res, next) => {
        try {
          const token = req.headers.authorization.split(' ')[1];
          req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
            next();
        } catch(e) {
            res.send({ error: 'Invalid Token' });
        }
      }


 module.exports = requireAuth