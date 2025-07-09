import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import corsOptions from './config/corsOption.js'; // Assuming you have a corsOptions.js file
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

const expressApp = express();
const uri = process.env.ATLAS;
const PORT = process.env.PORT || 3000;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});


import gameRouter from './route/game.js';


expressApp.use(express.json()); // Middleware to parse JSON bodies
expressApp.use(cors(corsOptions))
expressApp.use('/game', gameRouter); // Use the game router for /game routes
expressApp.get('/', (req, res) => {
  res.send('Hello, World!');
});

expressApp.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

