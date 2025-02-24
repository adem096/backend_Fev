const mongoose = require("mongoose");
const User = require("./userSchema");
const departmentSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
    
  },
  { timestamps: true }
);



const Department = mongoose.model("Department", jobOfferSchema);
module.exports = Department;