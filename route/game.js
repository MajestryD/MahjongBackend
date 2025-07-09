import {Router} from 'express';
import Game from  '../model/game.model.js'; // Adjust the path as necessary
const router = Router();


router.route('/').get(async (req, res) => {
    Game.find()
    .then(games => {
        res.status(200).json(games);
    }).catch(err => {
        res.status(400).json({ message: 'Error fetching games', error: err });
    });    
});

router.route('/create').post(async (req, res) => {
    const { gameHost, players } = req.body;
    if (!gameHost || !players || !Array.isArray(players)) {
        return res.status(400).json({ message: 'Invalid game data' });
    }

    const newGame = new Game({
        gameHost,
        players: players.map(player => ({
            playerId: player.playerId,
            score: player.score || 0,
            round: player.round || 0
        }))
    });

    newGame.save()
    .then(game => {    
        res.status(201).json(game);
    }).catch(err => {
        res.status(500).json({ message: 'Error creating game', error: err });
    });
});

router.route('/:gameId').get(async (req, res) => {
    const { gameId } = req.params;
    Game.findOne(gameId)
    .then(game => {
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.status(200).json(game);
    }).catch(err => {
        res.status(500).json({ message: 'Error fetching game', error: err });
    });
});

router.route('/:gameId').delete(async (req, res) => {
    const { gameId } = req.params;
    Game.findOneAndDelete(gameId)
    .then(game => {
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.status(200).json({ message: 'Game deleted successfully' });
    }).catch(err => {
        res.status(500).json({ message: 'Error deleting game', error: err });
    }); 
});

export default router;