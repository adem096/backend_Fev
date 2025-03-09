const mongoose = require("mongoose");
const jobOfferSchema = new mongoose.Schema(
  {
    
    title: { 
        type: String, 
        require: true 
    },
    description: {
        type : String, 
        require: false 
    },
    datePublication: {
        type : Date, 
        default:Date.now
    },
    status: {
        type: String,
        enum: ['Open', 'Closed'],
        default: 'Open',
    },
    candidats : [{type : mongoose.Schema.Types.ObjectId,ref: 'User'}],
    candidatures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Candidature" }]
  },
  { timestamps: true }
);



const JobOffer = mongoose.model("JobOffer", jobOfferSchema);
module.exports = JobOffer;