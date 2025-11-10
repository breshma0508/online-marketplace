const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const verifyToken = require('../middleware/verifyToken');

router.post('/:id', verifyToken, reviewController.addReview);

module.exports = router;
