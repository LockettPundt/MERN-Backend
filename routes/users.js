const express = require('express');

const router = express.Router();


router.get('/', (req, res) => {
  res.send('User log in page.');
});

module.exports = router;
