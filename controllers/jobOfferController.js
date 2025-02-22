const jobOfferModel = require('../models/jobOfferSchema');

module.exports.getAlljobOffers= async (req,res) => {
    try {
        const jobOfferListe = await jobOfferModel.find()

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
      const { title, description, datePublication, status } = req.body;
  
      if (!title & !description & !datePublication & !status) {
        throw new Error("error data");
      }
  
      const jobOffer = await jobOfferModel.create({
        title,
        description,
        datePublication,
        status
      });
  
      res.status(200).json({ jobOffer });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.updateJobOffer = async (req, res) => {
    try {
      const id = req.params.id;
      const { title, description, datePublication, status } = req.body;
  
      const jobOfferById = await jobOfferModel.findById(id);
  
      if (!jobOfferById) {
        throw new Error("Job offer introuvable");
      }
  
      if (!title & !description & !datePublication & !status) {
        throw new Error("error data");
      }
  
      await jobOfferModel.findByIdAndUpdate(id, {
        $set: { title, description, datePublication, status },
      });
  
      const updated = await jobOfferModel.findById(id);
  
      res.status(200).json({ updated });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  