/* eslint-disable no-unused-vars */
const express = require('express');
const moment = require('moment');

const router = express.Router();

const JobsModel = require('../models/JobsModel');

// retrieve all jobs in DB.

router.get('/', async (req, res) => {
  const testingOneTwo = await JobsModel.find();
  console.log(testingOneTwo);
  console.log(moment(testingOneTwo[0].applicationDate).format('LLL'));
  res.json(testingOneTwo);
});

// Post new application to DB.

router.post('/', async (req, res) => {
  const {
    company, position, applicationDate, interview, skillsNeeded,
  } = req.body;

  const job = new JobsModel({
    company,
    position,
    skillsNeeded,
    interview,
    applicationDate: moment(applicationDate).format('LLL'),
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