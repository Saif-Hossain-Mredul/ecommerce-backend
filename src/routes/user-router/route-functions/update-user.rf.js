const updateUser = async (req, res) => {
    try {
        const { name, password, shippingAddress } = req.body;
        const user = req.user;

        const allowedUpdates = ['name', 'password', 'shippingAddress'];
        const requestedUpdates = Object.keys(req.body);

        const isAllowedToUpdate = requestedUpdates.every((updateField) =>
            allowedUpdates.includes(updateField)
        );

        if (!isAllowedToUpdate) {
            throw new Error('Invalid update field.');
        }

        if (name) user.name = name;
        if (password) user.password = password;
        if (shippingAddress) user.shippingAddress = shippingAddress;

        await user.save();

        res.send(user);
    } catch (e) {
        res.status(400).send({ error: { status: 400, message: e.message } });
    }
};

module.exports = updateUser;
