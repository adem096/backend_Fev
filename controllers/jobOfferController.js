const jobOfferModel = require('../models/jobOfferSchema');
const userModel = require('../models/userSchema');

module.exports.getAlljobOffers= async (req,res) => {
    try {
        const jobOfferListe = await jobOfferModel.find()//.populate("candidats")

        if (!jobOfferListe || jobOfferListe.length === 0) {
            throw new Error("Aucun offre d'emploi trouvé");
          }
        res.status(200).json({jobOfferListe});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getJobOfferById = async (req, res) => {
    try {
      const id = req.params.id;
      const jobOffer = await jobOfferModel.findById(id)//.populate("owner");
  
      if (!jobOffer || jobOffer.length === 0) {
        throw new Error("job offer introuvable");
      }
  
      res.status(200).json(jobOffer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.deleteJobOfferById = async (req, res) => {
    try {
      const id = req.params.id;
  
      const jobOfferById = await jobOfferModel.findById(id);
  
      if (!jobOfferById || jobOfferById.length === 0) {
        throw new Error("job offer id introuvable");
      }
  
        
      await userModel.updateMany({}, {
          $pull: { jobOffers: id },
        });
  
      await jobOfferModel.findByIdAndDelete(id);
  
      res.status(200).json("deleted");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.addJobOffer = async (req, res) => {
    try {
      const { title, description, datePublication, status, department, type } = req.body;
  
      if (!title & !description & !datePublication & !status & !department  & !type) {
        throw new Error("error data");
      }
  
      const jobOffer = await jobOfferModel.create({
        title,
        description,
        datePublication,
        status,
        department,
        type,
      });
  
      res.status(200).json({ jobOffer });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.updateJobOffer = async (req, res) => {
    try {
      const id = req.params.id;
      const { title, description, datePublication, status, department, type } = req.body;
  
      const jobOfferById = await jobOfferModel.findById(id);
  
      if (!jobOfferById) {
        throw new Error("Job offer introuvable");
      }
  
      if (!title & !description & !datePublication & !status & !department & !type) {
        throw new Error("error data");
      }
  
      await jobOfferModel.findByIdAndUpdate(id, {
        $set: { title, description, datePublication, status, department, type },
      });
  
      const updated = await jobOfferModel.findById(id);
  
      res.status(200).json({ updated });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports.affect = async (req, res) => {
    try {
      const { userId, jobOfferId } = req.body;
  
      const jobOfferById = await jobOfferModel.findById(jobOfferId);
  
      if (!jobOfferById) {
        throw new Error("job offer introuvable");
      }
      const checkIfUserExists = await userModel.findById(userId);
      if (!checkIfUserExists) {
        throw new Error("User not found");
      }
  
      await jobOfferModel.findByIdAndUpdate(jobOfferId, {
        $set: { users: userId },
      });
  
      await userModel.findByIdAndUpdate(userId, {
        $push: { jobOffers : jobOfferId },
      });
  
      res.status(200).json('affected');
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.desaffect = async (req, res) => {
    try {
      const { userId, jobOfferId } = req.body;
  
      const jobOfferById = await jobOfferModel.findById(jobOfferId);
  
      if (!jobOfferById) {
        throw new Error("job offer introuvable");
      }
      const checkIfUserExists = await userModel.findById(userId);
      if (!checkIfUserExists) {
        throw new Error("User not found");
      }
  
      await jobOfferModel.findByIdAndUpdate(jobOfferId, {
        $unset: { users: 1 },
      });
  
      await userModel.findByIdAndUpdate(userId, {
        $pull: { jobOffers : jobOfferId },
      });
  
      res.status(200).json('desaffected');
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  