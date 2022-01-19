const signOutUser = async (req, res) => {
    const { user, token } = req;

    try {
        await user.deleteAuthToken(token);

        res.send();
    } catch (e) {
        res.status(500).send();
    }
};

module.exports = signOutUser;
