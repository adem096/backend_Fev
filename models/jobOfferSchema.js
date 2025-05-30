const mongoose = require("mongoose");
const jobOfferSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    datePublication: {
      type: Date,
      default: Date.now,
       validate: {
      validator: function(value) {
        return value < Date.now();
      },
      message: 'Date must be in the future'
    }
    },
    status: {
      type: String,
      enum: ["Open", "Closed", "Pending"],
      default: "Open",
    },
    department: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Full time", "Part time"],
    },
    candidats: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    candidatures: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Candidature" },
    ],
  },
  { timestamps: true }
);

const JobOffer = mongoose.model("JobOffer", jobOfferSchema);
module.exports = JobOffer;
