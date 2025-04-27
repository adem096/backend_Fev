const candidacyModel = require("../models/candidacySchema");
const uploadfile = require("../middlewares/uploadfile"); // adjust path if needed
module.exports.addCandidacy = async (req, res) => {
  try {
    console.log('req.body:', req.body);
console.log('req.file:', req.file);
    // If using uploadfile.single('cv'), req.file will be available
    const {
      jobTitle,
      jobType,
      jobDescription,
      email,
      firstName,
      lastName,
      address,
      dateSoumission,
      statut,
      experienceYear,
      educationDegree,
      phoneNumber,
    } = req.body;

    let cv = undefined;
    if (req.file) {
      cv = {
        fileName: req.file.filename,
        filePath: `/files/${req.file.filename}`,
      };
    }

    const candidacy = await candidacyModel.create({
      jobTitle,
      jobType,
      jobDescription,
      email,
      firstName,
      lastName,
      address,
      cv,
      dateSoumission,
      statut,
      experienceYear,
      educationDegree,
      phoneNumber,
    });
    res.status(200).json({ candidacy });
  } catch (error) {
    console.error("Error in addCandidacy:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllCandidacy= async (req,res) => {
    try {
        const CandidaciesListe = await candidacyModel.find()

        res.status(200).json({CandidaciesListe});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.deleteCandidacyById= async (req,res) => {
    try {
        const {id} = req.params

        const checkIfUserExists = await candidacyModel.findById(id);
        if (!checkIfUserExists) {
          throw new Error("Candidacy not found");
        }

        // await jobOfferModel.updateMany({user : id},{
        //     $unset: { user: 1 },// null "" 
        //   });

        await candidacyModel.findByIdAndDelete(id)

        res.status(200).json("deleted");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.updateCandidacyById = async (req, res) => {
  try {
      const {id} = req.params
      const { jobTitle,
        jobType,
        jobDescription,
        email,
        firstName,
        lastName,
        address,
        cv,
        dateSoumission,
        statut,
        experienceYear,
        educationDegree,
        phoneNumber,} = req.body;
  
      await candidacyModel.findByIdAndUpdate(id,{$set : { jobTitle,
        jobType,
        jobDescription,
        email,
        firstName,
        lastName,
        address,
        cv,
        dateSoumission,
        statut,
        experienceYear,
        educationDegree,
        phoneNumber,}})
      const updated = await candidacyModel.findById(id)
  
      res.status(200).json({updated})
  } catch (error) {
      res.status(500).json({message: error.message});
  }
  }
