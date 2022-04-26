const deleteFromCart = async (req, res) => {
    try {
        const productIndex = req.user.inCart.findIndex((product) => {
            return product.productId.toString() === req.body.productId;
        });

        if (productIndex === -1) throw new Error('Product not found');

        if (req.user.inCart[productIndex].quantity === 1) {
            req.user.inCart = req.user.inCart.filter(
                (product) => product.productId.toString() !== req.body.productId
            );
        } else {
            req.user.inCart[productIndex].quantity -= 1;
        }

        await req.user.save();

        res.status(204).send();
    } catch (e) {
        res.status(404).send({ error: { status: 404, message: e.message } });
    }
};

module.exports = deleteFromCart;
