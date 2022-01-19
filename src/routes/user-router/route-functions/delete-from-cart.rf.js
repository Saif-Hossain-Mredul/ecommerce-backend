const deleteFromCart = async (req, res) => {
    const productIndex = req.user.inCart.findIndex((product) => {
        return product.productId.toString() === req.body.productId;
    });

    if (req.user.inCart[productIndex].quantity === 1) {
        req.user.inCart = req.user.inCart.filter(
            (product) => product.productId.toString() !== req.body.productId
        );
    } else {
        req.user.inCart[productIndex].quantity -= 1;
    }

    await req.user.save();

    res.send();
};

module.exports = deleteFromCart;
