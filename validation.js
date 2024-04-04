
const Joi = require('joi');

module.exports.projectDetailSchema = Joi.object({
    type: Joi.string().required(),
    headline: Joi.string(),
    details: Joi.string(),
    attachment: Joi.array().items(Joi.string()),
    phase: Joi.string().valid('Planning', 'Execution', 'Completion'),

    locations: Joi.array().items(Joi.object({
        city: Joi.string(),
        state: Joi.string(),
        country: Joi.string()
    })).required(),

    contacts: Joi.object({
        contacDetail: Joi.array().items(Joi.object({
            phone: Joi.string(),
            email: Joi.string().email(),
            address: Joi.string()
        })),
        projectCost: Joi.object({
            amount: Joi.number().min(0),
            currency: Joi.string().valid('INR', 'USD', 'EUR'),
            scale: Joi.string().valid('Crore', 'Lakh', 'Thousand')
        }),
        projectCategory: Joi.string()
    }).required(),

    period: Joi.object({
        startDate: Joi.date(),
        endDate: Joi.date(),
         months: Joi.number().min(0),
       days: Joi.number().min(0)
    
    }),

    ownerAgency: Joi.object({
        ownerName: Joi.array().items(Joi.string()),
        source: Joi.string(),
        otherAgency: Joi.string()
    }).required()
});


