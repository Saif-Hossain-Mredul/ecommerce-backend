const getWishlist = async (req, res) => {
    try {
        const user = req.user;

        await user.populate({
            path: 'wishList',
            options: {
                limit: 10,
                skip: parseInt(req.query.skip),
            },
        });

        const wishList = user.wishList.map((product) =>
            product.shortResponse()
        );

        res.send(wishList);
    } catch (e) {
        res.status(400).send({ error: { status: 400, message: e.message } });
    }
};

module.exports = getWishlist;
