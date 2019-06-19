const express = require('express');
const router = express.Router();
const app = express();
const sequelize = require("./models").sequelize;

app.use('/static', express.static('public'));
app.set('view engine', 'pug');


const routes = require('./routes');
const books = require('./routes/books');
app.use(routes);
app.use('/books', books);

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

