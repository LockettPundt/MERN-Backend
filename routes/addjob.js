const express = require('express');

const router = express.Router();

// route to post jobs to DB.

router.get('/', (req, res) => {
  res.send('This is where a job will be posted.');
});

module.exports = router;
