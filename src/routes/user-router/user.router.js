const express = require('express');
const User = require('../../models/user.model');

const auth = require('../../middlewares/auth.middleware');
const createUser = require('./route-functions/create-user.rf');

const userRouter = express.Router();

// creates new user
userRouter.post('/sign-up', createUser);

// sign in route
userRouter.post('/sign-in', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findAndLoginByCredentials({ email, password });
        const token = await user.generateAuthToken();

        res.send({ user, token });
    } catch (e) {
        res.status(401).send(e.message);
    }
});

// sign-out route
userRouter.post('/sign-out', auth, async (req, res) => {
    const { user, token } = req;

    try {
        await user.deleteAuthToken(token);

        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

//get profile
userRouter.get('/profile', auth, async (req, res) => {
    try {
        res.send(req.user);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

module.exports = userRouter;
