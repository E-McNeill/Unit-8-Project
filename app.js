const express = require('express');
const router = express.Router();
const app = express();
const sequelize = require("./models").sequelize;

app.use('/static', express.static('public'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mainRoutes = require('./routes');
app.use(mainRoutes);

//error handling for routes that do not exist and books that we do not have

  app.use(function(err, res, next) {
    var err = new Error("Not Found"); 
    err.status = 404;
    console.log('There has been a ' + err.status + ' error.')
    next(err);
});

app.use(function (err, req, res, next) {
    if (err.status === 404) {
        res.render('page-not-found');
    } else {
        res.render('error');
    }
});

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Application running on localhost:3000');
    }); 
})

