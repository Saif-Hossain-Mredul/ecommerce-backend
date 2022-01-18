const Product = require('../../../models/product.model');

const getHomePageData = async (req, res) => {
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

    let mostBought = await Product.find()
        .sort({
            totalPurchase: 'desc',
        })
        .limit(5);

    mostBought = mostBought.map((product) => product.shortResponse());

    res.send({ popular, newest, mostBought });
};

module.exports = getHomePageData;
