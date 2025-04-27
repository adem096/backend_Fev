var express = require('express');
var router = express.Router();
const uploadfile = require('../middlewares/uploadfile');
const candidacyController = require('../controllers/candidacyController');
/* GET home page. */
router.get('/getAllCandidacy', candidacyController.getAllCandidacy );
router.delete('/deleteCandidacyById/:id', candidacyController.deleteCandidacyById );
router.put('/updateCandidacyById/:id', candidacyController.updateCandidacyById );
router.post('/addCandidacy', uploadfile.single('cv'), candidacyController.addCandidacy );


module.exports = router;
