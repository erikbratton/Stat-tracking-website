const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const player = require('./models/players');

// express app
const app = express();

//connect to mongoDB
const dbURI = 'mongodb+srv://erisimo:Hitbox44@sports.fcp6nb5.mongodb.net/sports?retryWrites=true&w=majority&appName=sports';
mongoose.connect(dbURI)
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));
    
// register view engine
app.set('view engine', 'ejs');

// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// listen for requests
app.listen(3000);

// routes
const playerRoutes = require('./routes/playerRoutes');
app.use('/', playerRoutes);

//must be at bottom 404
app.use((req, res) => {
    res.status(404).render('404');
});
