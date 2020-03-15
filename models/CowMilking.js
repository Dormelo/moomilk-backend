const mongoose = require('mongoose');

const CowMilkingSchema = mongoose.Schema({
    cowId: {
        type: mongoose.Types.ObjectId,
        ref: 'Cow',
        required: true
    },
    milkingId: {
        type: mongoose.Types.ObjectId,
        ref: 'Milking',
        required: true
    },
    litre: {
        type: mongoose.Types.Decimal128,
        required: true,
        max: 20,
        min: 0
    }
});

CowMilkingSchema.index({cowId:1, milkingId:1}, { unique: true });

module.exports = mongoose.model('CowMilking', CowMilkingSchema);