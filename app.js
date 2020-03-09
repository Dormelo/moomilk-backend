const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/users.js')
const cowsRoute = require('./routes/cows.js');
const milkingRoute = require('./routes/milking.js');
require('dotenv/config');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => res.send('Bienvenue sur l API Moomilk'));
app.use('/api/users', userRoute);
app.use('/api/cows', cowsRoute);
app.use('/api/milking', milkingRoute);

mongoose.connect(
    process.env.DB_CONNECTION, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    }, 
    () => console.log('Connected to DB!')
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`My REST API, running on port ${port}!`);
})
