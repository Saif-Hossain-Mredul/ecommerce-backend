const express = require('express');
require('./db/mongoose-connection.db');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.listen(port, () => {
    console.log('Connected to port ' + port);
});
