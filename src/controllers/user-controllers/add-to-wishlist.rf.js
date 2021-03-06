const addToWishlist = async (req, res) => {
    try {
        const user = req.user;

        if (!user.wishList.includes(req.body.productId)) {
            user.wishList.push(req.body.productId);
        }

        await user.save();

        res.status(200).send({result: 'Product added to wishlist'});
    } catch (e) {
        res.status(400).send({ error: { status: 409, message: e.message } });
    }
}

module.exports = addToWishlist