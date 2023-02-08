
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/user');
const attendeesRoutes = require('./routes/attendees');

const app = express();
app.use(cors());
app.use(express.json());


app.use('/user', userRoutes)
app.use('/', attendeesRoutes)


app.listen(process.env.PORT, () => console.log(`Express server running on PORT:${process.env.PORT}`));