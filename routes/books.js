const express = require('express');
const router = express.Router();
const Book = require("../models").Book;
const Sequelize = require("sequelize");

// //GET books (shows full list of books)
router.get('/books', function(req, res, next) {
    Book.findAll({order: [["id", "ASC"]]}).then(function(books){
      res.render('index', {books: books, title: 'All Books' });
    });
  });

//GET books new (new book form)
// router.get('/books/new', (req, res) => {
//     res.render('new-book');
// });

//(new book form)
router.get('/books/new', function(req, res, next) {
    res.render('new-book', {book: Book.build(), title: 'Add a New book'}); //book or books?
  });

// POST books new (posts new book to the database)
router.post('/books/new', function(req, res, next) {
    Book.create(req.body).then(function(book) { //book or books?
      res.redirect("/books/"); //book or books?
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


// Update a book
router.post('/books/:id', function(req, res, next){
    Book.findByPk(req.params.id).then(function(book){
      return book.update(req.body);
    }).then(function(book){
      res.redirect("/books");    
    });
  });

// Delete a book
router.post('/books/:id/delete', function(req, res, next){
  Book.findByPk(req.params.id).then(function(book) {
    return book.destroy();
  }).then(function(){
    res.redirect("/books");
  });
});

module.exports = router;