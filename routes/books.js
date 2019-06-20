const express = require('express');
const router = express.Router();
const Book = require("../models").Book;
const Sequelize = require("sequelize");

// //GET books (shows full list of books)
router.get('/books', function(req, res, next) {
    Book.findAll({order: [["Year", "DESC"]]}).then(function(books){
      res.render('index', {books: books, title: 'All Books' });
    });
  });

//GET books new (new book form)
// router.get('/books/new', (req, res) => {
//     res.render('new-book');
// });

//test(new book form)
router.get('/books/new', function(req, res, next) {
    res.render('new-book', {books: Book.build(), title: 'Add a New book'}); //book or books?
  });

//Create a new book
router.post('/books', function(req, res, next) {
    Book.create(req.body).then(function(books) { //book or books?
      res.redirect("/books/" + books.id); //book or books?
    });
  });

// // GET books ID (shows book details on click)
router.get("/books/:id", function(req, res, next){
    Book.findByPk(req.params.id).then(function(books){
      res.render("update-book", {books: books, title: books.title});
    });
  });

  

//Error
router.get('/error', (req, res) => {
    res.render('error');
});

// POST books new (posts new book to the database)

// POST books ID (Updates book info in database)
// POSt books ID DELETe (remove book)



module.exports = router;