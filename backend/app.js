// const mysql = require('mysql2');
const express = require('express');
// const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const userRoutes = require('./routes/user');
const { createConnection } = require('./db');

connection = createConnection();

const app = express();
app.use(cors());
app.use(express.json());


const getUserFromToken = (req) => {
  const token = req.headers.authorization.split(' ')[1];
  const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
  return user;
}

const verifyToken = (req, res, next) => {
  try {
      getUserFromToken(req);
      next();
  } catch(e) {
      res.send({ error: 'Invalid Token' });
  }
}
//! Kaip parasyti kad veiktu per middleware?
app.get('/attendees', verifyToken, (req, res) => {
  const user = getUserFromToken(req);
  
  connection.execute('SELECT * FROM event WHERE userId=?', [user.id], (err, events) => {
      res.send(events);
  });
});

app.post('/attendees', (req, res) => {
  const {name, surname, email, phone, userid} = req.body;
  connection.query('INSERT INTO event (name, surname, email, phone, userId) VALUES (?, ?, ?,?, ?)', [name, surname, email, phone, userid], (error, results) => {
    console.log(`User with userid:${userid} added to expenses list`);
  });
    connection.query('SELECT * FROM event WHERE userId=?', [userid], (error, results) => {
      if (error) throw error;
      res.json(results);
    });
})

app.delete('/attendees/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const { id: userid } = getUserFromToken(req);

  connection.execute(
      'DELETE FROM event WHERE id=? AND userid=?',
      [id, userid],
      () => {
          connection.execute(
              'SELECT * FROM event WHERE userId=?', 
              [userid], 
              (err, expenses) => {
                  res.send(expenses);
              }
          )
      }
  )
});



const verifyUser = (req, res) => {
  try {
      const token = req.headers.authorization.split(' ')[1];
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      res.send(user);
  } catch(e) {
      res.send({ error: 'Invalid Token' });
  }
};

// const mysqlConfig = {
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
//     port: process.env.MYSQL_PORT
//   };
  
//   const connection = mysql.createConnection(mysqlConfig);

  // const sendErrorResponse = (res, statusCode, message) => {
  //   return res.status(statusCode).json({ message });
  // };

app.use('/user', userRoutes)
// app.use('/event', userRoutes)




//   app.post('/register', (req, res) =>  {
//     const { name, surname, email, password } = req.body;
//     connection.execute(
//       'SELECT email FROM users WHERE email = ?',
//       [email],
//       (err, results) => {
//         if (err) {
//           sendErrorResponse(res, 500, 'There was a problem registering, please try again later');
//         } else if (results.length > 0) {
//           res.status(400).send({ message: 'Email already exists' });
//         } else {
//           const hashedPassword = bcrypt.hashSync(password, 12);
//           connection.execute(
//             'INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)',
//             [name, surname, email, hashedPassword], (err, result) => {
//               if (err) {
//                 sendErrorResponse(res, 500, 'There was a problem registering, please try again later');
//               } else {
//                 res.status(200).send({message: 'OK'});
//               }
//             });
//         }
//       });
// });

// app.post('/login', (req, res) => {
//   const { email, password } = req.body;
//   connection.query(
//     `SELECT * FROM users WHERE email = '${email}'`,
//     (error, result) => {
//       if (error) {
//         return sendErrorResponse(res, 500, 'An error occurred' );
//       } else {
//         if (!result.length) {
//           return sendErrorResponse(res, 401, 'Incorrect email or password');
//         } else {
//           const passwordHash = result[0].password;
//           const isPasswordCorrect = bcrypt.compareSync(password, passwordHash);
//           if (isPasswordCorrect) {
//             const { id, email } = result[0];
//             const token = jwt.sign({ id, email }, process.env.JWT_SECRET_KEY);
//             return res.json({ token, id, email });
//           } else {
//             return sendErrorResponse(res, 401, 'Incorrect email or password');
//           }
//         }
//       }
//     }
//   );
// });

app.get('/token/verify', (req, res) => {
  try {
      const token = req.headers.authorization.split(' ')[1];
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      res.send(user);
  } catch(e) {
      res.send({ error: 'Bad token' });
  }
});

app.listen(process.env.PORT, () => console.log(`Express server running on PORT:${process.env.PORT}`));