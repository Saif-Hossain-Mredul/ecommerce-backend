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
        res.send(400).send();
    }
};

module.exports = getWishlist;
