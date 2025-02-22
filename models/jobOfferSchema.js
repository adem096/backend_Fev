const mongoose = require("mongoose");
const User = require("./userSchema");
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
        users : [{type : mongoose.Schema.Types.ObjectId,ref: 'User'}]
    }
  },
  { timestamps: true }
);



const JobOffer = mongoose.model("JobOffer", jobOfferSchema);
module.exports = JobOffer;