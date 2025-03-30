var express = require('express');
var router = express.Router();
const employeeController = require('../controllers/employeeController');
/* GET home page. */
router.post('/createEmployee', employeeController.createEmployee );
router.get('/getAllEmployees', employeeController.getAllEmployees );
router.get('/getEmployeeById/:id', employeeController.getEmployeeById );

router.put('/updateEmployee/:id', employeeController.updateEmployee );
router.put('/affectEmployee', employeeController.affectEmployee );

router.delete('/deleteEmployeeById/:id', employeeController.deleteEmployeeById );

module.exports = router;