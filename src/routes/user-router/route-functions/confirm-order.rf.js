const confirmOrder = async (req, res) => {
    try {
        req.user.inCart.forEach((product) => {
            req.user.purchasedProducts.push({
                ...product,
                reviewed: false,
                productName: product.productName,
                price: product.price,
                quantity: product.quantity,
            });
        });

        req.user.inCart = [];

        await req.user.save();

        res.send({
            purchasedProducts: req.user.purchasedProducts.length,
            result: 'Your order is created successfully',
        });
    } catch (e) {
        console.log(e);
        res.status(400).send({ error: { status: 400, message: e.message } });
    }
};

module.exports = confirmOrder;
