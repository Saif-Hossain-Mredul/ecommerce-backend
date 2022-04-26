const signOutUser = async (req, res) => {
    const { user, token } = req;

    try {
        await user.deleteAuthToken(token);

        res.send();
    } catch (e) {
        res.status(500).send({ error: { status: 500, message: e.message } });
    }
};

module.exports = signOutUser;
