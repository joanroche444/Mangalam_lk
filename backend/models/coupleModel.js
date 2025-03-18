const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coupleSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    partnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    weddingDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['planning', 'completed', 'cancelled'],
        default: 'planning'
    }

}, { timestamps: true });


module.exports = mongoose.model('Couple', coupleSchema);