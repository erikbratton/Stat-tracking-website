const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sportSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    wins: {
        type: Number,
        default: 0
    },
    losses: {
        type: Number,
        default: 0
    }
});

const playerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    sports: [sportSchema]
}, { timestamps: true });

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;