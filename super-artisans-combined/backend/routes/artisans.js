const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const artisanController = require('../controllers/artisanController');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g,'_'))
});
const upload = multer({ storage });

router.get('/', artisanController.list);
router.get('/:id', artisanController.get);
router.post('/', verifyToken, upload.array('images', 10), artisanController.create);
router.put('/:id', verifyToken, upload.array('images', 10), artisanController.update);
router.delete('/:id', verifyToken, verifyAdmin, artisanController.remove);

module.exports = router;
