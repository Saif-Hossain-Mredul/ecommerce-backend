const express = require('express');
require('./db/mongoose-connection.db');
require('./models/review.model');
require('./models/user.model');
require('./models/product.model');

const userRouter = require('./routes/user-router/user.router');
const productRouter = require('./routes/product-router/product.router');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(userRouter);
app.use(productRouter);

app.listen(port, () => {
    console.log('Connected to port ' + port);
});
