const express = require('express');
const router = express.Router();

// GET Home (redirect to books) also found on index
router.get('/', (req, res) => {
    res.redirect('/books');
});

module.exports = router;