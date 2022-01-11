const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
        },
        totalPurchase: {
            type: Number,
        },
        rating: {
            type: Number,
        },
        displayImages: [
            {
                type: Buffer,
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Product = new mongoose.model('Product', productSchema);

module.exports = Product;
