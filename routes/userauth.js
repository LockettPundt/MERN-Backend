const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;
const router = express.Router();

// I'll refactor the middleware to work.

// const checkToken = (req, res, next) => {
//   const header = req.headers.authorization;
//   console.log(req.headers.authorization);
//   if (typeof header !== 'undefined') {
//     const bearer = header.split(' ');
//     const token = bearer[1];
//     req.token = token;
//     next();
//   } else {
//     res.sendStatus(403);
//   }
// };

router.post('/', (req, res) => {
  // console.log(req.body);
  const { userToken } = req.body;
  jwt.verify(userToken, jwtSecret, (err, authorizedData) => {
    if (err) {
      // If error send Forbidden (403)
      // console.log('ERROR: Could not connect to the protected route');
      res.sendStatus(403);
    } else {
      // If token is successfully verified, we can send the autorized data
      res.json({
        message: 'Successful log in',
        authorizedData,
      });
      // console.log('SUCCESS: Connected to protected route');
    }
  });
});


module.exports = router;
