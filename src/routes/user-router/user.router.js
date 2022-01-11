const express = require('express');
const User = require('../../models/user.model');

const userRouter = express.Router();

userRouter.post('/users/createUser', (req, res) => {
    const { email, password } = req.body;

    try {
        const user = new User({
            email,
            password,
        });

        res.status(201).send(user);
    } catch (e) {
        res.status(409).send();
    }
});

module.exports = userRouter;
