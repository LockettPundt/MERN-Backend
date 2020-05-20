const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;
const router = express.Router();


router.post('/', (req, res) => {
  console.log('this is the auth.', req.body.userToken);
  const { userToken } = req.body;
  jwt.verify(userToken, jwtSecret, (err, authorizedData) => {
    if (err) {
      console.log('ERROR: Could not connect to the protected route');
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Successful log in',
        authorizedData,
      });
      console.log('SUCCESS: Connected to protected route');
    }
  });
});


module.exports = router;
