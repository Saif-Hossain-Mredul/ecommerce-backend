const Product = require('../../../models/product.model');

const queryProducts = async (req, res) => {
    try {
        const queries = req.query;

        let products = await Product.find({ ...queries })
            .sort({
                [queries.sortBy]: queries.order,
            })
            .skip(parseInt(queries.skip))
            .limit(5);

        products = products.map((product) => product.shortResponse());

        res.send(products);
    } catch (e) {
        res.status(500).send({ error: { status: 500, message: e.message } });
    }
};

module.exports = queryProducts;
