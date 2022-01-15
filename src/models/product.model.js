const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        category: {
            type: String,
        },
        inStockQuantity: {
            type: Number,
        },
        brand: {
            type: String,
        },
        specification: {
            type: String,
        },
        price: {
            type: Number,
        },
        totalPurchase: {
            type: Number,
            default: 0,
        },
        rating: {
            type: Number,
            default: 0,
        },
        displayImages: [
            {
                image: { type: Buffer },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Product = new mongoose.model('Product', productSchema);

module.exports = Product;
