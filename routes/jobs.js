/* eslint-disable no-unused-vars */
const express = require('express');
const moment = require('moment');

const router = express.Router();
const JobsModel = require('../models/JobsModel');

// retrieve all jobs posted by the user.

router.post('/getjobs', async (req, res) => {
  const { user } = req.body;

  const userJobs = await JobsModel.find({ user });
  // console.log(userJobs);
  res.json(userJobs);
});

// Post new application to DB.

router.post('/', async (req, res) => {
  const {
    company, position, applicationDate, interview, skillsNeeded, user,
  } = req.body;
  // console.log(user);
  const job = new JobsModel({
    company,
    position,
    skillsNeeded: skillsNeeded || 'N/A',
    interview,
    applicationDate,
    user,
  });

  try {
    const jobPost = await job.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = router;
