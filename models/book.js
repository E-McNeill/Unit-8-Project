'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "The title is required."
        }
      }
    },
    author: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: "An author is required."
      }
      }
    },
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER,
  });
  Book.associate = function(models) {
  };
  return Book;
};