// models/Report.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  assessmentId: {
    type: String,
    required: true,
    unique: true
  },
  level: {
    type: String,
    required: true
  },
  answers: {
    type: Object,
    required: true
  },
  results: {
    type: Object,
    required: true
  },
  selectedCareer: {
    type: String
  },
  activities: {
    type: Array,
    default: []
  },
  evaluationResults: {
    type: Array,
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Make sure you're properly exporting the model
module.exports = mongoose.model('Report', reportSchema);