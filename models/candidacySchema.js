const mongoose = require("mongoose");
const candidacySchema = new mongoose.Schema(
  {
    candidat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
      },
      jobOffer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobOffer", 
        required: true,
      },
      dateSoumission: {
        type: Date,
        default: Date.now, 
      },
      statut: {
        type: String,
        enum: ["Accepté", "Refusé", "En attente"], 
        default: "En attente", 
      },
    },
  { timestamps: true }
);

const Candidacy = mongoose.model("Candidacy", candidacySchema);
module.exports = Candidacy;