/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;
const router = express.Router();

const UserModel = require('../models/UserModel');

router.get('/', async (req, res) => {
  const { userEmail } = req.body;
  const user = await UserModel.findOne({ email: userEmail });

  res.json(user);
});

// User Registration.

router.post('/register', async (req, res) => {
  const {
    firstName, lastName, email, password,
  } = req.body;


  try {
    const checkEmailExists = await UserModel.findOne({ email });
    console.log(checkEmailExists);
    if (validator.isEmail(email)
      && validator.isLength(password, { min: 5, max: undefined })
      && !checkEmailExists) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const UserInfo = new UserModel({
        firstName,
        lastName,
        email,
        password: hash,
      });
      const postUser = await UserInfo.save();
      const token = jwt.sign({ UserInfo }, jwtSecret, { expiresIn: '1h' });
      console.log(token);
      res.json({
        email,
        token,
      });
    }
    if (!validator.isEmail(email)) {
      res.json({ error: 'Enter a valid email address.' });
    }
    if (!validator.isLength(password, { min: 5, max: undefined })) {
      res.json({ error: 'Password must have 5 characters.' });
    }
    if (checkEmailExists) {
      res.json({ error: 'This email is already taken.' });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

// User Log In.

router.put('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const UserInfo = await UserModel.findOne({ email });
    console.log(UserInfo);
    if (!validator.isEmail(email)) {
      res.json({ error: 'Enter a valid email' });
    }
    if (!UserInfo) {
      res.json({ error: 'This is not a registered email.' });
    }
    if (UserInfo) {
      const match = bcrypt.compareSync(password, UserInfo.password);

      if (match) {
        const token = jwt.sign({ UserInfo }, jwtSecret, { expiresIn: '1h' });
        console.log(token);
        res.json({
          email,
          token,
        });
      } else {
        res.json({ error: 'Incorrect Password' });
      }
    }
  } catch (error) {
    console.log(error);
    // res.sendStatus(400);
  }
});

module.exports = router;
