const Vote = require('../models/Vote');

// Submit a vote for a specific game
exports.voteForGame = async (req, res) => {
  const { userId, gameId } = req.body;

  try {
    const vote = new Vote({ userId, gameId });
    await vote.save();

    // Count the total votes for the game
    const voteCount = await Vote.countDocuments({ gameId });

    // Emit vote update via WebSocket (handled in socket.js)
    req.io.emit('voteUpdate', { gameId, votes: voteCount });

    res.json({ success: true, votes: voteCount });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting vote' });
  }
};

// Get vote counts for all games
exports.getVotes = async (req, res) => {
  try {
    const votes = await Vote.aggregate([
      { $group: { _id: '$gameId', count: { $sum: 1 } } },
    ]);
    res.json(votes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching votes' });
  }
};
