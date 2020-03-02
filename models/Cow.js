const mongoose = require('mongoose');

const CowSchema = mongoose.Schema({
    immatriculationId: { 
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10 
    },
    travailId: { 
        type: String,
        validate: {
            validator: function() {
                return this.travailId && this.immatriculationId.substr(-4) === this.travailId;
            },
            message: props => `travailId must be equal to the 4 last characters of immatriculationId!`
          },
        required: true
    },
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    sexe: {
        type: String,
        enum: ['F', 'M'],
        required: true
    },
    bornAt: { 
        type: Date,
        required: true
    },
    lactation: {
        type: String,
        enum: ['aucune', 'veau', 'tank'],
        required: true
    },
    estPresente: {
        type: String,
        enum: ['oui', 'non'],
        required: true
    },
    sante: {
        type: String,
        enum: ['saine', 'malade'],
        required: true
    }
});

module.exports = mongoose.model('Cow', CowSchema);