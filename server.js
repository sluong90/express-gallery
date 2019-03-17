const express = require('express');
const bodyParser = require('body-parser');
const Business = require('./database/models/Business');
const hbs = require('express-handlebars');

// data vars
const PORT = process.env.PORT;
const SESSION_SECRET = process.env.SESSION_SECRET;
const REDIS_HOSTNAME = process.env.REDIS_HOSTNAME;

if (!PORT) { console.log('No Port Found'); }
if (!SESSION_SECRET) { console.log('No Session Secret Found'); }
if (!REDIS_HOSTNAME) { console.log('No Redis Hostname Found'); }
if (!PORT || !SESSION_SECRET || !REDIS_HOSTNAME) { return process.exit(1); }

// setup server middleware
const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.json())
app.engine('hbs', hbs({
    defaultLayout: 'home',
    extname: '.hbs'
}))
app.set('view engine', 'hbs');
// app.use('/businesses', Business)

// routes
app.get('/', (req, res) => {
    res.render("homebase")
});


// start server
app.listen(PORT, () => {
    console.log(`Server stated on port: ${PORT}`);
});