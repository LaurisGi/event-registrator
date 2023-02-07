const express = require('express');
const { createAttendee, getAttendees, deleteAttendee } = require('../controllers/attendeesController') 


const router = express.Router();

const requireAuth = require('..//middleware/requireAuth')

router.use(requireAuth);

router.post('/attendees', createAttendee)
router.get('/attendees', getAttendees)
router.delete('/attendees/:id', deleteAttendee)


module.exports = router