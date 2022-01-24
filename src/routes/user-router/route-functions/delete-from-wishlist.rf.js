const deleteFromWishlist = async (req, res) => {
    try {
        const user = req.user;

        const index = user.wishList.indexOf(req.body.productId);
        index > -1 ? user.wishList.splice(index, 1) : false;

        await user.save();

        res.send();
    } catch (e) {
        res.status(400).send();
    }
};

module.exports = deleteFromWishlist;
