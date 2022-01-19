const getProfile = async (req, res) => {
    try {
        res.send(req.user);
    } catch (e) {
        res.status(500).send(e.message);
    }
}

module.exports = getProfile