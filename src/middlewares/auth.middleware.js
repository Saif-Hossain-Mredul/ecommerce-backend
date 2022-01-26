const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '');
        const decodedToken = jwt.decode(token, process.env.JWT_SECRET);

        const user = await User.findOne({
            _id: decodedToken._id,
            'tokens.token': token,
        });

        if (!user) throw new Error('Unauthorized.');

        req.user = user;
        req.token = token;

        next();
    } catch (e) {
        res.status(401).send(e.message);
    }
};

module.exports = auth;
