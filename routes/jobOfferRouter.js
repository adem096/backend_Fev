var express = require('express');
var router = express.Router();
const jobOfferController = require('../controllers/jobOfferController');
/* GET home page. */
router.get('/getAlljobOffers', jobOfferController.getAlljobOffers );
router.get('/getJobOfferById/:id', jobOfferController.getJobOfferById );
router.post('/addJobOffer',jobOfferController.addJobOffer); 
router.delete('/deleteJobOfferById/:id',jobOfferController.deleteJobOfferById); 
router.put('/updateJobOffer/:id',jobOfferController.updateJobOffer); 

module.exports = router;
