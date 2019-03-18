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


app.get('/businesses', (req, res) => {

    return new Business()
        .fetchAll()
        .then(business => {
            return res.render('templates/index', { business: business.toJSON() });
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.post('/businesses', (req, res) => {
    const {author, url, description} = req.body;
    return new Business({ author, url, description }).save()
        .then((business) => {
            return res.redirect('/businesses');
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
})

app.get('/businesses/:id', (req, res) => {
    const id = Number(req.params.id);
    return new Business()
    .where({id})
    .fetchAll()
    .then(result => {
        return res.render('templates/biz', { business: result.toJSON() });
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })
})

app.get('businesses/new', (req,res) => {
    res.render('templates/new');
})

// start server
app.listen(PORT, () => {
    console.log(`Server stated on port: ${PORT}`);
});
