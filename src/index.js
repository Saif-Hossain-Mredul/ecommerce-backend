const express = require('express');
require('./db/mongoose-connection.db');
require('./models/review.model');
require('./models/user.model');
require('./models/product.model');
require('./config/cloudinary-config');

const userRouter = require('./routes/user-router/user.router');
const productRouter = require('./routes/product-router/product.router');

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(userRouter);
app.use(productRouter);

app.get('/', (req, res) => {
    res.send();
});

app.get('*', (req, res) => {
    res.send('Page not found.');
});

app.listen(port, () => {
    console.log('Connected to port ' + port);
});
