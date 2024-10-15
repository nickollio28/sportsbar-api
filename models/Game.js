const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sport: { type: String, required: true },
  status: { type: String, default: 'upcoming' },  // 'live', 'upcoming', 'ended'
  channel: { type: String, required: true },
  startTime: { type: Date, required: true },
  score: { type: String, default: '0-0' },
  timeRemaining: { type: String, default: 'N/A' },
});

module.exports = mongoose.model('Game', GameSchema);
