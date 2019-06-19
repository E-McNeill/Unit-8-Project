const express = require('express');
const router = express.Router();

var bookroutes = require('./books');
router.use('/', bookroutes);

// GET Home (redirect to books) also found on index
router.get('/', (req, res) => {
    res.redirect('/books');
});

module.exports = router;