/* eslint-disable no-unused-vars */
const express = require('express');
const bcrypt = require('bcrypt');

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
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const newUser = new UserModel({
    firstName,
    lastName,
    email,
    password: hash,
  });
  try {
    const postUser = await newUser.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(200);
  }
});

// User Log In.

router.post('/login', async (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
