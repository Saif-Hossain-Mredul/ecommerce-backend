const getCartProduct = (req, res) => {
    try {
        res.send(req.user.inCart);
    } catch (e) {
        res.status(400).send({ error: { status: 400, message: e.message } });
    }
};

module.exports = getCartProduct;
