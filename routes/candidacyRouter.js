var express = require('express');
var router = express.Router();
const candidacyController = require('../controllers/candidacyController');
/* GET home page. */
router.get('/getAllCandidacy', candidacyController.getAllCandidacy );
router.post('/addCandidacy', candidacyController.addCandidacy );

module.exports = router;