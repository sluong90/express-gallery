const router = require('express').Router();
const Users = require('../db/models/Users');
const passport = require('passport');
const LocalStrategy = require('passsport-local');
const bcrypt = require('bcrypt');


passport.serializeUser( (user, done) => {

})

passport.deserializeUser( (user, done) => {

})

passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {

}))





module.exports = router;