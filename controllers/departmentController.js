const departmentModel = require('../models/departmentSchema');
const employeeModel = require("../models/employeeSchema");
const userModel = require('../models/userSchema');

module.exports.createDepartment = async (req, res) => {
    try {
      const { name, description } = req.body;
  
      if (!name) {
        throw new Error("Department name is required");
      }
  
      const department = await departmentModel.create({
        name,
        description,
        nbrEmployes: 0,
        employees: []
      });
  
      res.status(200).json({ message: 'Department created successfully', department });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.getAllDepartments= async (req,res) => {
    try {
        const departmentsListe = await departmentModel.find().populate("employees")

        if (!departmentsListe || departmentsListe.length === 0) {
            throw new Error("No departments found");
          }

        // Update employee counts for all departments
        for (const department of departmentsListe) {
          await department.updateEmployeeCount();
        }

        res.status(200).json({departmentsListe});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports.getDepartmentById = async (req, res) => {
    try {
      const id = req.params.id;
      const department = await departmentModel.findById(id).populate("employees");
  
      if (!department) {
        throw new Error("Department not found");
      }
  
      // Update employee count
      await department.updateEmployeeCount();
  
      res.status(200).json(department);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.updateDepartment = async (req, res) => {
    try {
        const { name, description } = req.body;
        const department = await departmentModel.findById(req.params.id);
  
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }
  
        // Update basic info
        department.name = name || department.name;
        department.description = description || department.description;
  
        // Update employee count
        await department.updateEmployeeCount();
  
        await department.save();
  
        res.status(200).json({ 
          message: 'Department updated successfully', 
          department 
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating department', error });
    }
};

module.exports.deleteDepartmentById = async (req, res) => {
    try {
      const id = req.params.id;
  
      const department = await departmentModel.findById(id);
  
      if (!department) {
        throw new Error("Department not found");
      }
  
      // Remove department reference from all employees
      await employeeModel.updateMany(
        { departement: id },
        { $unset: { departement: 1 } }
      );
  
      await departmentModel.findByIdAndDelete(id);
  
      res.status(200).json("Department deleted");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.searchDepartmentByName = async (req, res) => {
    try {
        const { name } = req.query
        if(!name){
            throw new Error("Please provide a name for search");
        }

        const departmentsListe = await departmentModel.find({
            name: {$regex: name , $options: "i"}
        }).populate("employees");

        if (!departmentsListe || departmentsListe.length === 0) {
            throw new Error("No departments found with that name");
          }

        // Update employee counts for found departments
        for (const department of departmentsListe) {
          await department.updateEmployeeCount();
        }

        const count = departmentsListe.length
        res.status(200).json({departmentsListe,count})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    }
