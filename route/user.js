const {Router} = require('express');
const User = require('../model/user.model.js'); // Adjust the path as necessary
const router = Router();

router.route('/').get(async (req, res) => {
    User.find()
    .then(users => {
        res.status(200).json(users);
    }).catch(err => {
        res.status(400).json({ message: 'Error fetching users', error: err });
    });    
});

router.route('/create').post(async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Invalid user data' });
    }

    const newUser = new User({
        username,
        password,
        email
    });

    newUser.save()
    .then(user => {    
        res.status(201).json(user);
    }).catch(err => {
        res.status(400).json({ message: 'Error creating user', error: err });
    });
}); 

router.route('/:userId').get(async (req, res) => {
    const { userId } = req.params;
    User.findById(userId)
    .then(user => {
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }).catch(err => {
        res.status(400).json({ message: 'Error fetching user', error: err });
    });
});

router.route('/:userId').delete(async (req, res) => {
    const { userId } = req.params;
    User.findByIdAndDelete(userId)
    .then(user => {
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    }).catch(err => {
        res.status(400).json({ message: 'Error deleting user', error: err });
    });
});