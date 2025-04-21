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
        required: false
    },
    numTel: {
        type: Number, // Store as a number
        required: [true, 'Phone number is required'],
        validate: {
            validator: function (value) {
                // Ensure the number has exactly 8 digits
                return /^\d{8}$/.test(value);
            },
            message: 'Phone number must contain exactly 8 digits'
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'], // Ensures the field is mandatory
        unique: true, // Ensures the email is unique in the database
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Regex for valid email format
            'Please provide a valid email address' // Error message if validation fails
        ]
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