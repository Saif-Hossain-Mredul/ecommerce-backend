const addToCart = async (req, res) => {
    const productIndex = req.user.inCart.findIndex((product) => {
        return product.productId.toString() === req.body.productId;
    });

    if (productIndex === -1) {
        req.user.inCart.push({ ...req.body });
    } else {
        req.user.inCart[productIndex].quantity += 1;
    }

    await req.user.save();

    res.send();
};

module.exports = addToCart;
