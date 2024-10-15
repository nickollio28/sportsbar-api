const express = require('express');
const { voteForGame, getVotes } = require('../controllers/voteController');
const router = express.Router();

router.post('/vote', voteForGame);
router.get('/votes', getVotes);

module.exports = router;
