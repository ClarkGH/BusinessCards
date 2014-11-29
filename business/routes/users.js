var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function (req, res) {
  res.send('Hello World!');
})

// accept POST request on the homepage
router.post('/users/:id', function (req, res) {
  res.send('Got a POST request');
})

// accept PUT request at /user
router.put('/users', function (req, res) {
  res.send('Got a PUT request at /user');
})

// accept DELETE request at /user
router.delete('/users', function (req, res) {
  res.send('Got a DELETE request at /user');
})

module.exports = router;
