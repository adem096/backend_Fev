const employeeModel = require("../models/employeeSchema");
const departmentModel = require("../models/departmentSchema");

module.exports.createEmployee = async (req, res) => {
  try {
    const { nom, prenom, dateEmbauche, numTel, email, salaire, poste } =
      req.body;
    // if (!checkIfUserExists) {
    //     throw new Error("User not found");
    //   }
    const employee = await employeeModel.create({
      nom,
      prenom,
      dateEmbauche,
      numTel,
      email,
      salaire,
      poste,
    });
    res.status(200).json({ employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllEmployees= async (req,res) => {
    try {
        const EmployeesListe = await employeeModel.find().populate("Department");

        res.status(200).json({EmployeesListe});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.updateEmployee = async (req, res) => {
  try {
      const {id} = req.params
      const {nom , prenom, dateEmbauche, numTel, email, salaire, poste} = req.body;
  
      await employeeModel.findByIdAndUpdate(id,{$set : {nom , prenom, dateEmbauche, numTel, email, salaire, poste}})
      const updated = await employeeModel.findById(id)
  
      res.status(200).json({updated})
  } catch (error) {
      res.status(500).json({message: error.message});
  }
  }

  module.exports.deleteEmployee= async (req,res) => {
    try {
        const {id} = req.params

        const checkIfEmployeeExists = await employeeModel.findById(id);
        if (!checkIfEmployeeExists) {
          throw new Error("Employee not found");
        }

       // await jobOfferModel.updateMany({user : id},{
          //  $unset: { user: 1 },// null "" 
         // });

        await employeeModel.findByIdAndDelete(id)

        res.status(200).json("deleted");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.affectEmployee = async (req, res) => {
  try {
    const { employeeId , departmentId } = req.body;

    const departmentById = await departmentModel.findById(departmentId);

    if (!departmentById) {
      throw new Error("department is introuvable");
    }
    const checkIfEmployeeExists = await employeeModel.findById(employeeId);
    if (!checkIfEmployeeExists) {
      throw new Error("Employee not found");
    }

    await departmentModel.findByIdAndUpdate(departmentId, {
      $set: { employees: employeeId },
    });

    await employeeModel.findByIdAndUpdate(employeeId, {
      $push: { departement : departmentId },
    });

    res.status(200).json('affected');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getEmployeeById= async (req,res) => {
  try {
      //const id = req.params.id
      const {id} = req.params
      //console.log(req.params.id)
      const employee = await employeeModel.findById(id).populate("departement")

      res.status(200).json({employee});
  } catch (error) {
      res.status(500).json({message: error.message});
  }
}
