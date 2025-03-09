const candidacyModel = require("../models/candidacySchema");
const JobOffer = require("../models/jobOfferSchema");
const jobOfferModel = require('../models/jobOfferSchema');
const userModel = require('../models/userSchema');


module.exports.addCandidacy = async (req, res) => {
    try {
      const { candidat, jobOffer, dateSoumission ,statut } = req.body;
  
      // Vérifier si le candidat et l'offre existent
      const existingCandidat = await userModel.findById(candidat);
      const existingJobOffer = await jobOfferModel.findById(jobOffer);
  
      if (!existingCandidat || !existingJobOffer) {
        return res.status(404).json({ message: "Candidat ou Offre introuvable" });
      }
  
      const newCandidature = new candidacyModel({
        candidat,
        jobOffer,
        dateSoumission,
        statut: statut || "En attente",
      });
  
      await newCandidature.save();
      res.status(201).json({ message: "Candidature ajoutée avec succès", ListeCandidatures: newCandidature });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de l'ajout de la candidature", error });
    }
  };


module.exports.getAllCandidacy = async (req, res) => {
    try {
      const candidatures = await candidacyModel.find()
        /*.populate("candidat", "username email") // Récupère les infos du candidat
        .populate("jobOffer", "title description"); // Récupère les infos de l'offre*/
  
      res.status(200).json(candidatures);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des candidatures", error });
    }
  };

  exports.deleteCandidacy = async (req, res) => {
    try {
      const { id } = req.params; 
      const deletedCandidature = await candidacyModel.findByIdAndDelete(id);
  
      if (!deletedCandidature) {
        return res.status(404).json({ message: "Candidature non trouvée" });
      }
  
      res.status(200).json({ message: "Candidature supprimée avec succès" });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la suppression", error });
    }
  };

  exports.editCandidacy = async (req, res) => {
    try {
      const { id } = req.params; // ID de la candidature
      const { statut } = req.body; // Nouveau statut
  
      // Vérification si le statut est valide
      if (!["Accepté", "Refusé", "En attente"].includes(statut)) {
        return res.status(400).json({ message: "Statut invalide" });
      }
  
      const updatedCandidature = await candidacyModel.findByIdAndUpdate(
        id,
        { statut },
        { new: true } // Retourne l'objet mis à jour
      );
  
      if (!updatedCandidature) {
        return res.status(404).json({ message: "Candidature non trouvée" });
      }
  
      res.status(200).json({ message: "Statut de la candidature mis à jour",  updatedCandidature });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la modification", error });
    }
  };