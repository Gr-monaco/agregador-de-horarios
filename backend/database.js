require('dotenv').config();

const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

mongoose.Promise = global.Promise;

mongoose.connect(mongoString, { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database.'))

module.exports = db;