const Game = require('../models/Game');

// Fetch all live and upcoming games
exports.getGames = async (req, res) => {
  try {
    const games = await Game.find({ status: { $in: ['live', 'upcoming'] } });
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching games' });
  }
};
