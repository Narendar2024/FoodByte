const express = require('express');
const mongoose = require('mongoose');
const dotEnv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const vendorRoutes = require('./routes/vendorRoutes');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const { METHODS } = require('http');
const app = express();

dotEnv.config();
app.use(cors({
    origin: 'https://food-byte-dashboard-kjiveabzg-narender-korems-projects.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Database connected successfully");
}).catch((err) => console.log(err));

app.use(bodyParser.json());
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes);
app.use('/product', productRoutes);
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
    console.log(`Server is running successfully @ ${PORT}`);
});

app.get('/', (req, res) => {
    res.send(`<h1>FoodByte</h1>`);
});