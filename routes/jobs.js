/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');
const moment = require('moment');

const router = express.Router();
const JobsModel = require('../models/JobsModel');

// retrieve all jobs posted by the user.

router.post('/getjobs', async (req, res) => {
  const { user } = req.body;

  const userJobs = await JobsModel.find({ user });
  console.log(userJobs);
  res.json(userJobs);
});

// Post new application to DB.

router.post('/', async (req, res) => {
  const {
    company, position, applicationDate, interview, skillsNeeded, user,
  } = req.body;
  const job = new JobsModel({
    company,
    position,
    skillsNeeded: skillsNeeded || 'N/A',
    interview,
    applicationDate: moment(applicationDate).format('MM/DD/YY'),
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
// grabs single listing to for the User to update.

router.get('/:id?', async (req, res) => {
  const { id } = req.params;
  const requestedJob = await JobsModel.find({ _id: id });
  res.json(requestedJob);
});

// deletes Job.

router.delete('/:id?', async (req, res) => {
  const { id } = req.params;
  const removeJob = await JobsModel.deleteOne({ _id: id });
  console.log(removeJob);
  res.json(removeJob);
});

// updates Job

router.put('/:id?', async (req, res) => {
  const { id } = req.params;
  const {
    company, interview, skillsNeeded, position,
  } = req.body;
  try {
    const updateJob = await JobsModel.updateOne({ _id: id }, req.body);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

module.exports = router;
