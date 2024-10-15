const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Vote', VoteSchema);
