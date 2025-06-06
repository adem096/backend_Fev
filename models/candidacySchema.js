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
  enum: [
    "High School Diploma/GED",
    "Associate's Degree",
    "Bachelor's degree",
    "Master's degree",
    "Doctorate (PhD)",
    "Professional Degree",
    "Vocational/Technical Certificate",
    "Baccalaureate degree", 
    "Other"
  ],
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
    interview_date: {
      type: String, // Store as string; format can be "MM/DD/YYYY" or similar
    },
    interview_time: {
      type: String, // Store as string; format can be "HH:MM AM/PM"
    },
  },
  { timestamps: true }
);

const Candidacy = mongoose.model("Candidacy", candidacySchema);
module.exports = Candidacy;