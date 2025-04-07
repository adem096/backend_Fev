const mongoose = require("mongoose");
const candidacySchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enum: ["Full time", "Part time", "Contract", "Internship", "Temporary"],
      required: true,
    },
    jobDescription: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      match: [/.+\@.+\..+/, "Please enter a valid email"],
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    experienceYear: {
      type: Number,
      required: true,
    },
    educationDegree: {
      type: String,
      enum: ["Bachelor's degree", "Master's degree", "Baccalaureate degree"],
      required: true,
    },
    cv: {
      fileName: String,
      filePath: String,
    },

    dateSoumission: {
      type: Date,
      default: Date.now,
    },
    statut: {
      type: String,
      enum: ["Accepted", "Rejected", "Pending"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Candidacy = mongoose.model("Candidacy", candidacySchema);
module.exports = Candidacy;
