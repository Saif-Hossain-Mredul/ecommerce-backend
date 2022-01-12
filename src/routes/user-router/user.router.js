const express = require('express');
const User = require('../../models/user.model');

const auth = require('../../middlewares/auth.middleware');

const userRouter = express.Router();

// creates new user
userRouter.post('/sign-up', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            throw new Error('Email and password is required to create an user');
        }

        const user = new User({
            email,
            password,
        });

        await user.save();
        const token = await user.generateAuthToken();

        res.status(201).send({ user, token });
    } catch (e) {
        res.status(409).send(e.message);
    }
});

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

module.exports = userRouter;
