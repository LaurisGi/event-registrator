const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createConnection } = require('../db');

const connection = createConnection();

const sendErrorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({ message });
  };

  const createToken = (id) => {
    return jwt.sign({ id}, process.env.JWT_SECRET_KEY, {expiresIn: '3d'});
  }


  //! tokeno verifikacija

  // const getUserFromToken = (req) => {
  //   const token = req.headers.authorization.split(' ')[1];
  //   const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
  //   return user;
  // }
  
  // const verifyToken = (req, res, next) => {
  //   try {
  //       getUserFromToken(req);
  //       next();
  //   } catch(e) {
  //       res.send({ error: 'Invalid Token' });
  //   }
  // }
  
  // app.get('/expenses', verifyToken, (req, res) => {
  //   const user = getUserFromToken(req);
    
  //   connection.execute('SELECT * FROM users WHERE userId=?', [user.id], (err, users) => {
  //       res.send(users);
  //   });
  // });

    //! tokeno verifikacija

//   const createToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {expiresIn: '3d'});
//   }

//   const getUserFromToken = (req) => {
//     const token = req.headers.authorization.split(' ')[1];
//     const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     return user;
// }

// const verifyToken = (req, res, next) => {
//   try {
//       getUserFromToken(req);
//       next();
//   } catch(e) {
//       res.send({ error: 'Invalid Token' });
//   }
// }
//!! pakeisti vieta i eventControleri
// app.get('/events', verifyToken, (req, res) => {
//   const user = getUserFromToken(req);
  
//   connection.execute('SELECT * FROM event WHERE userId=?', [user.id], (err, events) => {
//       res.send(events);
//   });
// });



// !veike@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// const loginUser = (req, res) => {
//     const { email, password } = req.body;
//     connection.query(
//       `SELECT * FROM users WHERE email = '${email}'`,
//       (error, result) => {
//         if (error) {
//           return sendErrorResponse(res, 500, 'An error occurred' );
//         } else {
//           if (!result.length) {
//             return sendErrorResponse(res, 401, 'Incorrect email or password');
//           } else {
//             const passwordHash = result[0].password;
//             const isPasswordCorrect = bcrypt.compareSync(password, passwordHash);
//             if (isPasswordCorrect) {
//               const { id, email } = result[0];
//               const token = createToken(id, email)
//               console.log(token)
//               // return res.json({ token, id, email });
//               return res.send({ token, id, email });
//             } else {
//               return sendErrorResponse(res, 401, 'Incorrect email or password');
//             }
//           }
//         }
//       }
//     );
//   };

  
// !veike@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

const loginUser = (req, res) => {
  const { email, password } = req.body;
  connection.query(
    `SELECT * FROM users WHERE email = '${email}'`,
    (error, result) => {
      if (error) {
        return sendErrorResponse(res, 500, 'An error occurred' );
      } else {
        if (!result.length) {
          return sendErrorResponse(res, 401, 'Incorrect email or password');
        } else {
          const passwordHash = result[0].password;
          const isPasswordCorrect = bcrypt.compareSync(password, passwordHash);
          if (isPasswordCorrect) {
            const {id, email} = result[0];
            const token = jwt.sign({id}, process.env.JWT_SECRET_KEY);
            res.send({token, id, email});
          } else {
            return sendErrorResponse(res, 401, 'Incorrect email or password');
          }
        }
      }
    }
  );
};

  const registerUser = (req, res) =>  {
    const { name, surname, email, password } = req.body;
    connection.execute(
      'SELECT email FROM users WHERE email = ?',
      [email],
      (err, results) => {
        if (err) {
          sendErrorResponse(res, 500, 'There was a problem registering, please try again later');
        } else if (results.length > 0) {
          res.status(400).send({ message: 'Email already exists' });
        } else {
          const hashedPassword = bcrypt.hashSync(password, 12);
          connection.execute(
            'INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)',
            [name, surname, email, hashedPassword], (err, result) => {
              if (err) {
                sendErrorResponse(res, 500, 'There was a problem registering, please try again later');
              } else {
                res.status(200).send({message: 'Registration Successful. Please login'});
              }
            });
        }
      });
};

  //! tokeno verifikacija

// const verifyUser = (req, res) => {
//   try {
//       const token = req.headers.authorization.split(' ')[1];
//       const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
//       res.send(user);
//   } catch(e) {
//       res.send({ error: 'Invalid Token' });
//   }
// };
  //! tokeno verifikacija
module.exports = { loginUser, registerUser
  //  getAtendees 
  // verifyUser 
}