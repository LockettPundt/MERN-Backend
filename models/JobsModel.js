const mongoose = require('mongoose');


const JobsModel = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  applicationDate: {
    type: String,
    required: true,
  },
  skillsNeeded: [String],
  interview: {
    type: Boolean,
    default: false,
  },
  user: {
    type: String,

  },
});


module.exports = mongoose.model('jobs', JobsModel);
