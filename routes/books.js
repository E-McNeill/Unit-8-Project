const express = require('express');
const router = express.Router();
const Book = require("../models").Book;

//GET books (shows full list of books)
router.get('/books', (req, res) => {
    res.render('index');
});


module.exports = router;