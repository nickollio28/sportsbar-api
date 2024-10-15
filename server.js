const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const connectDB = require('./config/db');
const gameRoutes = require('./routes/gameRoutes');
const voteRoutes = require('./routes/voteRoutes');
const setupWebSocket = require('./socket');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = setupWebSocket(server);

// Middleware
app.use(cors());
app.use(express.json());

// Make Socket.io available to routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use('/api', gameRoutes);
app.use('/api', voteRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Sports Bar API!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
