var express = require('express');
var router = express.Router();
const candidacyController = require('../controllers/candidacyController');
/* GET home page. */
router.post('/addCandidacy', candidacyController.addCandidacy );
router.get('/getAllCandidacy', candidacyController.getAllCandidacy );
router.delete('/deleteCandidacyById/:id', candidacyController.deleteCandidacyById );
router.put('/updateCandidacyById/:id', candidacyController.updateCandidacyById );

module.exports = router;
