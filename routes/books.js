const express = require('express');
const router = express.Router();
const Book = require("../models").Book;
const Sequelize = require("sequelize");

//Shows the full list of books
router.get('/books', function(req, res, next) {
    Book.findAll({order: [["id", "ASC"]]}).then(function(books){
      res.render('index', {books: books, title: 'All Books' });
    }).catch(function(err){
      res.sendStatus(500);
    });
  });

//Displays the form to add a new book
router.get('/books/new', function(req, res, next) {
    res.render('new-book', {book: Book.build(), title: 'Add a New book'}); //book or books?
  });

// Adds a new book to the database
router.post('/books/new', function(req, res, next) {
    Book.create(req.body).then(function(book) { //book or books?
      res.redirect("/books/"); //book or books?
    }).catch(function(err){
      if (err.name === "SequelizeValidationError"){
        res.render('new-book', {
          book: Book.build(req.body), 
          title: 'Add a New book',
        errors: err.errors
        });
      } else {
        throw err;
      }
    }).catch(function(err){
      res.sendStatus(500);
    });
  });

// Shows the specific book's details
router.get("/books/:id", function(req, res, next){
    Book.findByPk(req.params.id).then(function(books){
      if (books) {
      res.render("update-book", {books: books, title: books.title});
    } else {
      res.sendStatus(404);
    }
  }).catch(function(err){
    res.sendStatus(500);
    });
  });

// Updates details for a specific book
router.post('/books/:id', function(req, res, next){
    Book.findByPk(req.params.id).then(function(book){
      if (book){
      return book.update(req.body);
      } else {
        res.sendStatus(404);
      }
    }).then(function(book){
      res.redirect("/books");    
    }).catch(function(err){
      if (err.name === "SequelizeValidationError"){
        var book = Book.build(req.body);
        book.id = req.params.id;
        res.render('update-book', {
          book: book, 
          title: 'Add a New book',
        errors: err.errors
        });
      } else {
        throw err;
      }
    }).catch(function(err){
      res.sendStatus(500);
    });
  });

// Deletes a specific book
router.post('/books/:id/delete', function(req, res, next){
  Book.findByPk(req.params.id).then(function(book) {
    return book.destroy();
  }).then(function(){
    res.redirect("/books");
  }).catch(function(err){
    res.sendStatus(500);
  });
});


module.exports = router;