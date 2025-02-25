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
        const EmployeesListe = await employeeModel.find()//.populate("JobOffer");

        res.status(200).json({EmployeesListe});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
