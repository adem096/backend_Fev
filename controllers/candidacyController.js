const candidacyModel = require("../models/candidacySchema");

module.exports.addCandidacy = async (req, res) => {
  try {
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
    } = req.body;

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
    });
    res.status(200).json({ candidacy });
  } catch (error) {
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
