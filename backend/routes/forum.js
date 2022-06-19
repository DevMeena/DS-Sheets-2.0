const express = require('express');
const { isAuthenticated, isSignedIn, isAdmin } = require('../controllers/auth');
const router = express.Router();
const {
  getFeedbacks,
  submitFeedback,
  deleteFeedback,
} = require('../controllers/forum');
const { getUserById } = require('../controllers/user');

router.get('/feedbacks', getFeedbacks);
router.post('/feedback', submitFeedback);
router.delete('/feedback/:fid', deleteFeedback);

module.exports = router;
