const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const cowsRoute = require('./routes/cows.js');
require('dotenv/config');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => res.send('Bienvenue sur l\'API Moomilk'));

app.use('/api/cows', cowsRoute);

mongoose.connect(
    process.env.DB_CONNECTION, 
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    () => console.log('Connected to DB!')
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`My REST API, running on port ${port}!`);
})