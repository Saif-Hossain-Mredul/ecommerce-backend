const mongoose = require('mongoose');

const connectionURL = 'mongodb://127.0.0.1:27017/ecommerce-api';

const connection = mongoose.connect(connectionURL, () => {
    console.log('Connected to db')
});

module.exports = connection;
