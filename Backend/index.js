const express = require('express');
const app = express();
require('dotenv').config();
require('./Models/db.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./Routers/authRouters');
const ProductRouter = require('./Routers/ProductsRouter');

const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', authRoutes);
app.use('/products',ProductRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})