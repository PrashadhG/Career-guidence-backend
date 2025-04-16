// routes/reportRoutes.js
const express = require("express");
const Report = require('../models/Report');
const auth =  require('../middleware/authMiddleware');

const router = express.Router();

// Save report
router.post('/', auth, async (req, res) => {
  try {
    console.log(req.user)

    const {
      assessmentId,
      level,
      answers,
      results,
      selectedCareer,
      activities,
      evaluationResults
    } = req.body;

    

    const report = new Report({
      userId: req.user.id,
      assessmentId,
      level,
      answers,
      results,
      selectedCareer,
      activities,
      evaluationResults
    });

    await report.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get user's reports
router.get('/my', auth, async (req, res) => {
  try {
    console.log
    const reports = await Report.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single report
router.get('/:id', auth, async (req, res) => {
  try {
    const report = await Report.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Delete report
router.delete('/:id', auth, async (req, res) => {
  try {
    const report = await Report.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!report) {
      return res.status(404).json({ 
        error: 'Report not found or you are not authorized to delete it'
      });
    }

    res.status(200).json({ 
      success: true,
      message: 'Report deleted successfully',
      deletedId: report._id
    });
    
  } catch (err) {
    console.error('Delete report error:', err);
    res.status(500).json({ 
      error: 'Server error while deleting report',
      details: err.message 
    });
  }
});

module.exports = router;