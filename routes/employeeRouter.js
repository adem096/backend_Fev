var express = require('express');
var router = express.Router();
const employeeController = require('../controllers/employeeController');
/* GET home page. */
router.post('/createEmployee', employeeController.createEmployee );
router.get('/getAllEmployees', employeeController.getAllEmployees );

module.exports = router;