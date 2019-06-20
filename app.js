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

//error handling
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    console.log('There has been a ' + err.status + ' error.')
    res.render('page-not-found');
    next(err);
  });

// error handling
// app.use((req, res, next) => {
//     const err = new Error('404');
//     err.status = 404
//     next(err);
// });

// app.use((req, res, next) => {
//     const err = new Error('500');
//     err.status = 500;
//     next(err);
// });

// app.use((err, req, res, next) => {
//     console.log('There has been a ' + err.status + ' error.')
//     // res.locals.error = err;
//     if (err.status = 500) {
//         res.render('error')
//     } else {
//         res.render('page-not-found')
//     }
// });




sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Application running on localhost:3000');
    }); 
})

