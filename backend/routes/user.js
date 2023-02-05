const express = require('express')

const {loginUser, registerUser, verifyUser, getAtendees } = require('../controllers/userController')

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);

//! perkelti i atendees
// router.get('/atendees', getAtendees);
// router.post('/verify', verifyUser);
// router.get('/verify', verifyUser);


module.exports = router