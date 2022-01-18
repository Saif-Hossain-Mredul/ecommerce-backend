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
        totalReviews: {
            type: Number,
            default: 0,
        },
        rating: {
            type: Number,
            default: 0,
        },
        previewImage: { type: Object },
        displayImages: [{ type: Object }],
        otherImages: [{ type: Object }],
    },
    {
        timestamps: true,
    }
);

productSchema.methods.shortResponse = function () {
    const product = this;

    const productObject = product.toObject();

    delete productObject.inStockQuantity;
    delete productObject.specification;
    delete productObject.totalPurchase;
    delete productObject.displayImages;
    delete productObject.otherImages;
    delete productObject.createdAt;
    delete productObject.updatedAt;
    delete productObject.__v;

    return productObject;
};

productSchema.methods.toJSON = function () {
    const product = this;

    const productObject = product.toObject();

    delete productObject.inStockQuantity;
    delete productObject.__v;

    return productObject;
};

const Product = new mongoose.model('Product', productSchema);

module.exports = Product;
