const candidacyModel = require("../models/candidacySchema");
const uploadfile = require("../middlewares/uploadfile"); // adjust path if needed

// Add Candidacy
module.exports.addCandidacy = async (req, res) => {
  try {
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);

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

// Get All Candidacies
module.exports.getAllCandidacy = async (req, res) => {
  try {
    const CandidaciesListe = await candidacyModel.find();
    res.status(200).json({ CandidaciesListe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Candidacy by ID
module.exports.deleteCandidacyById = async (req, res) => {
  try {
    const { id } = req.params;

    const checkIfUserExists = await candidacyModel.findById(id);
    if (!checkIfUserExists) {
      throw new Error("Candidacy not found");
    }

    await candidacyModel.findByIdAndDelete(id);

    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Candidacy by ID
module.exports.updateCandidacyById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
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
      interview_date, // New field
      interview_time, // New field
    } = req.body;

    const updateData = {
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
      interview_date, // Save interview date
      interview_time, // Save interview time
    };

    await candidacyModel.findByIdAndUpdate(id, { $set: updateData });
    const updated = await candidacyModel.findById(id);

    res.status(200).json({ updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};