const mongoose = require("mongoose");
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
    },
    employees: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employee', 
            required: true
        },
    
  },
  { timestamps: true }
);

departmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;