const mysql = require('mysql2');
const { db } = require('./config');

const createConnection = () => mysql.createConnection(db);

module.exports = {
    createConnection
}