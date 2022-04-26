const User = require('../../models/user.model');

const createUser = async (req, res) => {
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
        res.status(409).send({ error: { status: 409, message: e.message } });
    }
};

module.exports = createUser;
