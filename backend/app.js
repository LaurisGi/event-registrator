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
  console.log(token)
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



app.post('/attendees', verifyToken, (req, res) => {
  const {name, surname, email, phone, userid} = req.body;
  try {
    connection.query('INSERT INTO event (name, surname, email, phone, userid) VALUES (?, ?, ?, ?, ?)', [name, surname, email, phone, userid], (error, results) => {
      console.log(`User with userid:${userid} added to event list`);
    });
  } catch (error) {
    res.status(400).json({error: error.message})
  }


    connection.query('SELECT * FROM event WHERE userId=? ORDER BY id DESC', [userid], (error, results) => {
      if (error) throw error;
      res.json(results);
    });
})

//!
app.get('/attendees', verifyToken, (req, res) => {
  const user = getUserFromToken(req);
  
  connection.execute('SELECT * FROM event WHERE userid=? ORDER BY id DESC', [user.id], (err, events) => {
      res.send(events);
  });
});


app.delete('/attendees/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const {id: userid } = getUserFromToken(req);

  connection.execute(
      'DELETE FROM event WHERE id=? AND userid=?',
      [id, userid],
      () => {
          connection.execute(
              'SELECT * FROM event WHERE userid=? ORDER BY id DESC', 
              [userid],
              (err, attendees) => {
                  res.send(attendees);
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

app.use('/user', userRoutes)
// app.use('/event', userRoutes)


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