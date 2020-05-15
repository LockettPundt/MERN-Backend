/* eslint-disable no-unused-vars */
const express = require('express');
const moment = require('moment');

const router = express.Router();

const JobsModel = require('../models/JobsModel');

// retrieve all jobs in DB.

router.get('/', async (req, res) => {
  const testingOneTwo = await JobsModel.find();
  console.log(testingOneTwo);
  console.log(moment(testingOneTwo[testingOneTwo.length - 1].applicationDate).format('MM/DD/YY'));
  res.json(testingOneTwo);
});

// Post new application to DB.

router.post('/', async (req, res) => {
  const {
    company, position, applicationDate, interview, skillsNeeded,
  } = req.body;
  const errorMessage = {
    company: false,
    position: false,
    interview: false,
  };
  const job = new JobsModel({
    company,
    position,
    skillsNeeded: skillsNeeded || 'N/A',
    interview,
    applicationDate: applicationDate ? moment(applicationDate).format('MM/DD/YY') : moment().toNow(),
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
