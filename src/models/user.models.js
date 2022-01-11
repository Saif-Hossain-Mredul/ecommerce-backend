const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        shippingAddress: [
            {
                address: {
                    type: String,
                },
            },
        ],
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
        inCart: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                },
                productName: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                },
                quantity: {
                    type: Number,
                },
                addedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        purchasedProducts: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                },
                productName: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                },
                quantity: {
                    type: Number,
                },
                purchasedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);
