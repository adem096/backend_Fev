const departmentModel = require('../models/departmentSchema');
const userModel = require('../models/userSchema');

module.exports.createDepartment = async (req, res) => {
    try {
      const { name, description} = req.body;
  
      if (!name & !description ) {
        throw new Error("error data");
      }
  
      const department = await departmentModel.create({
        name,
        description
      });
  
      res.status(200).json({ message: 'Département créé avec succès' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.getAllDepartments= async (req,res) => {
    try {
        const departmentsListe = await departmentModel.find()

        if (!departmentsListe || departmentsListe.length === 0) {
            throw new Error("Aucun departement trouvé");
          }
        res.status(200).json({departmentsListe});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports.getDepartmentById = async (req, res) => {
    try {
      const id = req.params.id;
      const department = await departmentModel.findById(id)//.populate("owner");
  
      if (!department || department.length === 0) {
        throw new Error("department introuvable");
      }
  
      res.status(200).json(department);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.updateDepartment = async (req, res) => {
    try {
        const { name, description } = req.body;
        const updatedDepartment = await departmentModel.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true }
        )//.populate('manager');
        if (!updatedDepartment) {
            return res.status(404).json({ message: 'Département non trouvé' });
        }
        res.status(200).json({ message: 'Département mis à jour avec succès', departmentModel: updatedDepartment });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du département', error });
    }
};

module.exports.deleteDepartmentById = async (req, res) => {
    try {
      const id = req.params.id;
  
      const DepartmentById = await departmentModel.findById(id);
  
      if (!DepartmentById || DepartmentById.length === 0) {
        throw new Error("Department id introuvable");
      }
  
        
      //await userModel.updateMany({}, {
      //    $pull: { jobOffers: id },
       // });
  
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
            throw new Error("Veuillez fournir un nom pour la recherche.");
        }

        const departmentsListe = await departmentModel.find({
            name: {$regex: name , $options: "i"}
        })

        if (!departmentsListe) {
            throw new Error("Department name is not found");
          }
          const count = departmentsListe.length
        res.status(200).json({departmentsListe,count})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    }
