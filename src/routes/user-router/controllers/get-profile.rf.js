const getProfile = async (req, res) => {
    try {
        res.send(req.user);
    } catch (e) {
        res.status(500).send({ error: { status: 500, message: e.message } });
    }
}

module.exports = getProfile