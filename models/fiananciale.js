// Step 1: Define Schema
const mongoose = require('mongoose');

// Define schema for financial information
const FinancialSchema = new mongoose.Schema({
    
    otherAgencies:{
        type:{ 
            type: String,
            enum: ['Bidders', 'Supplier', 'Fainancier','Contractor','Consultant'],
       },
        
        financierName: {
            type: String,
            //required: true
        },
        financierAddress: {
            type: String,
            //required: true
        }
    }
});

// Create model for financial information
const Financial = mongoose.model('Financial', FinancialSchema);

module.exports = Financial;
