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
        required: false
    },
    nbrEmployes: {
      type: Number,
      default: 0,
      required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }]
  },
  { timestamps: true }
);

departmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Method to update employee count
departmentSchema.methods.updateEmployeeCount = async function() {
  this.nbrEmployes = this.employees.length;
  await this.save();
};

const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;