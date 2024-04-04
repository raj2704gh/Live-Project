const mongoose = require('mongoose');

// Define schema for project details
const ProjectDetailSchema = new mongoose.Schema({
    type:{
        type:String,
        enum:["News","Projects"]
       // required:true
    },
    headline: {
        type: String,
        //required: true
    },
    details: {
        type: String,
       // required: true
    },
    attachment: [{
        type: String, // Assuming the attachment is a file path or URL
        //required: true
       }],
    phase: {
        type: String,
        enum: ['Planning', 'Execution', 'Completion'], // Example phases, adjust as needed
        //required: true
    },

    locations: [{
        city: {
            type: String,
            //required: true
        },
        state: {
            type: String,
           // required: true
        },
        country: {
            type: String,
           // required: true
        }
    }],


    
    contacts:{

        "contacDetail" :[{
            phone: {
                type: String,
               //required: true
                 },
           email: {
                type: String,
             // required: true
                 },
          address: {
            type: String,
            //required: true
               },
        }],
    
        projectCost: {
            amount: {
                type: Number,
               // required: true
            },
            currency: {
                type: String,
                enum: ['INR', 'USD', 'EUR'], // Add more currencies as needed
               // required: true
            },
            scale: {
                type: String,
                enum: ['Crore', 'Lakh', 'Thousand'], // Example scales, adjust as needed
               // required: true
            }
        },
        projectCategory: {
            type: String,
            //required: true
        },

    },

    period: {
        startDate: {
            type: Date,
            default: Date.now
            //required: true
        },
        endDate: {
            type: Date,
            //required: true
        },
      months: {
                type: Number,
                default:0
            },
     days: {
                type: Number,
                default:0
            }
        
        
    },
    ownerAgency: {
        ownerName:[ {
            type: String,
            //required: true
        }],
        source: {
            type: String,
           // required: true
        },
        otherAgency: {
             type: String,
            enum: ['Bilders', 'Supplier', 'Fainancier','Contractor','Consultant']

        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: String,
        default: () => {
            const date = new Date();
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            return date.toLocaleDateString('en-IN', options);
        }
    },
    updatedAt:{
        type:String,
    }
    
    
});

// Create model for project details
const ProjectDetail = mongoose.model('ProjectDetail', ProjectDetailSchema);

module.exports = ProjectDetail;
