const User = require('../../../models/user.model');

const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findAndLoginByCredentials({ email, password });
        const token = await user.generateAuthToken();

        res.send({ user, token });
    } catch (e) {
        res.status(401).send(e.message);
    }
};

module.exports = signInUser;
