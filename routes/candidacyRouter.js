var express = require('express');
var router = express.Router();
const candidacyController = require('../controllers/candidacyController');
/* GET home page. */
router.post('/addCandidacy', candidacyController.addCandidacy );
router.get('/getAllCandidacy', candidacyController.getAllCandidacy );

module.exports = router;
