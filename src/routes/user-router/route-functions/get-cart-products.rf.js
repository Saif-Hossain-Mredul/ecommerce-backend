const getCartProduct = (req, res) => {
    try {
        res.send(req.user.inCart);
    } catch (e) {
        res.status(400).send();
    }
};

module.exports = getCartProduct;
