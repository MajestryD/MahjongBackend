const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    gameId: { type: String, required: true, unique: true },
    players: [
        {
            playerId: { type: String, required: true, unique: true },
            score: { type: Number, default: 0 }
        }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;