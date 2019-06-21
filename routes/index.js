const express = require('express');
const router = express.Router();

var bookroutes = require('./books');
router.use('/', bookroutes);

// Homepage, redirects to book directory
router.get('/', (req, res) => {
    res.redirect('/books');
});

module.exports = router;