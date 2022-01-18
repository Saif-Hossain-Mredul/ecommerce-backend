const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        reviewerId: {
            type: mongoose.Schema.Types.ObjectId,
        },

        reviewerName: {
            type: String,
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
        },

        rating: { type: Number, default: 0 },

        reviewDescription: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Review = new mongoose.model('Review', reviewSchema);

module.exports = Review;
