const express = require('express');
const User = require('../../models/user.model');

const userRouter = express.Router();

userRouter.post('/users/createUser', async (req, res) => {
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

        res.status(201).send(user);
    } catch (e) {
        res.status(409).send();
    }
});

module.exports = userRouter;
