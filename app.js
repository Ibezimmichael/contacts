const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const connectDb = require('./config/dbConnection');
const contacts = require('./routes/contacts');
const users = require('./routes/users');

connectDb();
const app = express();

const port = process.env.PORT 


app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.use('/api/contacts', contacts);
app.use('/api/users', users);
app.use(errorHandler);






app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
})