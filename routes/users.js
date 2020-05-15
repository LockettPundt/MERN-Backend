/* eslint-disable no-unused-vars */
const express = require('express');
const bcrypt = require('bcrypt');
const validator = require('validator');

const router = express.Router();

const UserModel = require('../models/UserModel');

router.get('/', (req, res) => {
  res.send('User log in page.');
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
      const newUser = new UserModel({
        firstName,
        lastName,
        email,
        password: hash,
      });
      const postUser = await newUser.save();
      res.sendStatus(200);
    }
    if (!validator.isEmail(email)) {
      res.send('Enter a valid email address.');
    }
    if (!validator.isLength(password, { min: 5, max: undefined })) {
      res.send('Password must have 5 characters.');
    }
    if (checkEmailExists) {
      res.send('This email is already taken.');
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

// User Log In.

router.post('/login', async (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
