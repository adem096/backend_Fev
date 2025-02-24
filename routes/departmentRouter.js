var express = require('express');
var router = express.Router();
const departmentController = require('../controllers/departmentController');
/* GET home page. */
//router.get('/getOsInformation', osController.getOsInformation );
router.post('/createDepartment', departmentController.createDepartment );
router.get('/getAllDepartments', departmentController.getAllDepartments );
router.get('/getDepartmentById/:id', departmentController.getDepartmentById );
router.get('/searchDepartmentByName',departmentController.searchDepartmentByName);

router.put('/updateDepartment/:id', departmentController.updateDepartment );
router.delete('/deleteDepartmentById/:id', departmentController.deleteDepartmentById );

module.exports = router;