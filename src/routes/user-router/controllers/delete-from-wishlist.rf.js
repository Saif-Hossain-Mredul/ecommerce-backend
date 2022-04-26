const deleteFromWishlist = async (req, res) => {
    try {
        const user = req.user;

        const index = user.wishList.indexOf(req.body.productId);
        index > -1 ? user.wishList.splice(index, 1) : false;

        await user.save();

        res.status(204).send();
    } catch (e) {
        res.status(400).send({ error: { status: 400, message: e.message } });
    }
};

module.exports = deleteFromWishlist;
