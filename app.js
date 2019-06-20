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
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status || 500)
    console.log('There has been a ' + err.status + ' error.')
    res.render('error');
});



sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Application running on localhost:3000');
    }); 
})

