const express = require('express');
const router = express.Router();
const knex = require('../database');
const Business = require('./database/models/Business');


router.get('/businesses', (req, res) => {

  return new Business()
      .fetchAll()
      .then(business => {
          return res.json(business);
      })
      .catch((err) => {
          console.log(err);
          res.sendStatus(500);
      });
});

module.exports = router;
