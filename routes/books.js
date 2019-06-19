const express = require('express');
const router = express.Router();
const Book = require("../models").Book;
const Sequelize = require("sequelize");

// //GET books (shows full list of books)
// router.get('/books', (req, res) => {
//     res.render('index');
// });

/* GET articles listing. */
router.get('/books', function(req, res, next) {
    Book.findAll({order: [["Year", "DESC"]]}).then(function(books){
      res.render('index', {books: books, title: 'All Books' });
    });
  });

//GET books new (new book form)
router.get('/books/new', (req, res) => {
    res.render('new-book');
});

//Error
router.get('/error', (req, res) => {
    res.render('error');
});

// POST books new (posts new book to the database)
// GET books ID (shows book details on click)
// POST books ID (Updates book info in database)
// POSt books ID DELETe (remove book)



module.exports = router;