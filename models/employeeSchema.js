const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    dateEmbauche: {
        type: Date,
        default: Date.now 
    },
    departement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department', 
        required: true
    },
    numTel: {
        type: Number,
        required: false 
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salaire: {
        type: Number,
        required: false
    },
    poste: {
        type: String,
        required: false 
    }
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;