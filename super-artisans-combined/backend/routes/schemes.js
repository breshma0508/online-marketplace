const express = require('express');
const router = express.Router();
const schemesController = require('../controllers/schemesController');

router.get('/', schemesController.list);
router.get('/:code', schemesController.get);

module.exports = router;
