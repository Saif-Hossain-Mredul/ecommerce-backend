const Product = require('../../models/product.model');

const getHomePageData = async (req, res) => {
    try {
        let popular = await Product.find()
            .sort({
                rating: 'desc',
            })
            .limit(5);

        popular = popular.map((product) => {
            return product.shortResponse();
        });

        let newest = await Product.find()
            .sort({
                createdAt: 'desc',
            })
            .limit(5);

        newest = newest.map((product) => product.shortResponse());

        let bestSeller = await Product.find()
            .sort({
                totalPurchase: 'desc',
            })
            .limit(5);

            bestSeller = bestSeller.map((product) => product.shortResponse());

        res.send({ popular, newest, bestSeller });
    } catch (e) {
        res.status(400).send({ error: { status: 400, message: e.message } })
    }
};

module.exports = getHomePageData;
