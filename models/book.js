'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      },
    },
    author: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true
      },
    },
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER,
    operatorsAliases: false
  });
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};