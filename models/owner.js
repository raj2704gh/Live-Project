const mongoose = require('mongoose');
// Define schema for owner information
const OwnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    abbreviation: {
        type: String,
        required: true
    },
    
});

// Create model for owner information
const Owner = mongoose.model('Owner', OwnerSchema);

module.exports = Owner;
