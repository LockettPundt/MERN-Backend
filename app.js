/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const jobsRouter = require('./routes/jobs');
const userAuth = require('./routes/userauth');

require('dotenv').config();

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.DB_NAME,
})
  .then(() => console.log('connected'))
  .catch((err) => console.log(err));


const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/jobs', jobsRouter);
app.use('/userauth', userAuth);
module.exports = app;
