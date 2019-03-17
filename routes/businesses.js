const express = require('express');
const router = express.Router();
const Business = require('./database/models/Business');


router.get('/', function (req, res) {
    return new Business().fetchAll()
    .then((business) => {
      return res.json(business);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.get('/new', function (req, res) {
    res.render('home')
});


module.exports = router;