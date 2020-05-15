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
    type: Date,
    default: Date.now,
  },
  skillsNeeded: [String],
  interview: {
    type: Boolean,
    default: false,
  },
});


module.exports = mongoose.model('jobs', JobsModel);
