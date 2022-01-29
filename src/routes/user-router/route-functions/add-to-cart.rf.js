const addToCart = async (req, res) => {
    try {
        const productIndex = req.user.inCart.findIndex((product) => {
            return product.productId.toString() === req.body.productId;
        });

        if (productIndex === -1) {
            req.user.inCart.push({ ...req.body });
        } else {
            req.user.inCart[productIndex].quantity += 1;
        }

        await req.user.save();

        res.send({result: 'Product added to cart.'});
    } catch (e) {
        res.status(400).send({ error: { status: 400, message: e.message } });
    }
};

module.exports = addToCart;
