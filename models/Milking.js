const mongoose = require('mongoose');

const MilkingSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Milking', MilkingSchema);