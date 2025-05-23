const employeeModel = require("../models/employeeSchema");
const departmentModel = require("../models/departmentSchema");

module.exports.createEmployee = async (req, res) => {
  try {
    const { nom, prenom, dateEmbauche, numTel, email, salaire, poste, departement } = req.body;
    
    const employee = await employeeModel.create({
      nom,
      prenom,
      dateEmbauche,
      numTel,
      email,
      salaire,
      poste,
      departement
    });

    // If department is provided, update department's employee count
    if (departement) {
      const department = await departmentModel.findById(departement);
      if (department) {
        department.employees.push(employee._id);
        await department.updateEmployeeCount();
      }
    }

    res.status(200).json({ employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllEmployees = async (req, res) => {
  try {
    const EmployeesListe = await employeeModel.find().populate("departement");
    res.status(200).json({ EmployeesListe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, dateEmbauche, numTel, email, salaire, poste, departement } = req.body;

    // Get the old employee data to check department changes
    const oldEmployee = await employeeModel.findById(id);
    if (!oldEmployee) {
      throw new Error("Employee not found");
    }

    // Update employee
    const updated = await employeeModel.findByIdAndUpdate(
      id,
      { $set: { nom, prenom, dateEmbauche, numTel, email, salaire, poste, departement } },
      { new: true }
    );

    // Handle department changes
    if (oldEmployee.departement?.toString() !== departement) {
      // Remove from old department if exists
      if (oldEmployee.departement) {
        const oldDepartment = await departmentModel.findById(oldEmployee.departement);
        if (oldDepartment) {
          oldDepartment.employees = oldDepartment.employees.filter(
            empId => empId.toString() !== id
          );
          await oldDepartment.updateEmployeeCount();
        }
      }

      // Add to new department if provided
      if (departement) {
        const newDepartment = await departmentModel.findById(departement);
        if (newDepartment) {
          if (!newDepartment.employees.includes(id)) {
            newDepartment.employees.push(id);
            await newDepartment.updateEmployeeCount();
          }
        }
      }
    }

    res.status(200).json({ updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await employeeModel.findById(id);
    if (!employee) {
      throw new Error("Employee not found");
    }

    // Remove from department if exists
    if (employee.departement) {
      const department = await departmentModel.findById(employee.departement);
      if (department) {
        department.employees = department.employees.filter(
          empId => empId.toString() !== id
        );
        await department.updateEmployeeCount();
      }
    }

    await employeeModel.findByIdAndDelete(id);
    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.affectEmployee = async (req, res) => {
  try {
    const { employeeId, departmentId } = req.body;

    const department = await departmentModel.findById(departmentId);
    if (!department) {
      throw new Error("Department not found");
    }

    const employee = await employeeModel.findById(employeeId);
    if (!employee) {
      throw new Error("Employee not found");
    }

    // Remove from old department if exists
    if (employee.departement) {
      const oldDepartment = await departmentModel.findById(employee.departement);
      if (oldDepartment) {
        oldDepartment.employees = oldDepartment.employees.filter(
          empId => empId.toString() !== employeeId
        );
        await oldDepartment.updateEmployeeCount();
      }
    }

    // Add to new department
    employee.departement = departmentId;
    await employee.save();

    if (!department.employees.includes(employeeId)) {
      department.employees.push(employeeId);
      await department.updateEmployeeCount();
    }

    res.status(200).json('affected');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await employeeModel.findById(id).populate("departement");
    res.status(200).json({ employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
