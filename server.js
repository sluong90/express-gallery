const express = require('express');
const bodyParser = require('body-parser');
const Business = require('./database/models/Business');
const hbs = require('express-handlebars');
const methodOverride = require('method-override');
const app = express();
const Users = require('./database/models/Users');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const passport = require('passport');
const AuthRoutes = require('./routes/auth');

// data vars
const PORT = process.env.PORT;
const SESSION_SECRET = process.env.SESSION_SECRET;
const REDIS_HOSTNAME = process.env.REDIS_HOSTNAME;

if (!PORT) { console.log('No Port Found'); }
if (!SESSION_SECRET) { console.log('No Session Secret Found'); }
if (!REDIS_HOSTNAME) { console.log('No Redis Hostname Found'); }
if (!PORT || !SESSION_SECRET || !REDIS_HOSTNAME) { return process.exit(1); }

// setup server middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(session({
    store: new RedisStore(),
    secret: 'YOU HAVE THE POWER!',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride('_method'))
app.engine('hbs', hbs({
    defaultLayout: 'home',
    extname: '.hbs'
}))
app.set('view engine', 'hbs');
// app.use('/businesses', Business)

// ROUTES FOR AUTHENTICATION
// app.get('/', (req, res) => {
//     res.send('sanity check')
// })



//get all users


app.get('/users', (req, res) => {
    // console.log('hit')
    Users
    .fetchAll()
    .then(users => {
        res.json(users.serialize());
    })
    .catch(err => {
        console.log(err.message)
    })
})

app.get('/users/:id/business', (req, res) => {
    const { id } = req.params;
    console.log('hit', id)
   return Business
    .where({user_id: id})
    .fetchAll()
    .then( business => {
        res.json(business)
    })
    .catch( err => {
        res.json(err);

    })
})




//original method requests
app.get('/', (req, res) => {
    res.render("homebase", { style: 'home.css' })
});

app.get('/businesses', (req, res) => {

    return new Business()
        .fetchAll()
        .then(business => {
            return res.render('templates/index', { business: business.toJSON(), style: 'index.css' });
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.get('/businesses/new', (req, res) => {
    res.render('templates/new', { style: 'new.css' });
})

app.post('/businesses', (req, res) => {
    const { user_id, name, author, url, description } = req.body;
    return new Business({ user_id, name, author, url, description })
        .save()
        .then((result) => {
            // return res.json(result);
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
        .where({ id })
        .fetchAll()
        .then(result => {
            return res.render('templates/biz', { business: result.toJSON(), style: 'biz.css' });
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
})


app.get('/businesses/:id/edit', (req, res) => {
    const id = Number(req.params.id);
    return new Business({ id })
        .fetch()
        .then(selectedBusiness => {
            console.log(selectedBusiness.toJSON(), "bus obj")
            return res.render('templates/edit', selectedBusiness.toJSON());

            // { style: 'edit.css' });
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
})

app.delete('/businesses/:id', (req, res) => {
    return new Business()
        .where({ id: req.params.id })
        .destroy()
        .then(result => {
            return res.redirect('/businesses');
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
})

app.put('/businesses/:id/edit', (req, res) => {
    const id = Number(req.params.id);
    const { name, author, url, description } = req.body;
    return new Business({ id })
        .fetch()
        .then(selectedBusiness => {
            console.log(selectedBusiness.toJSON(), "bus obj updated")
            const updatedBusiness = { name, author, url, description };
            return selectedBusiness.save(updatedBusiness)
                .then(() => {
                    return res.render('templates/edit', updatedBusiness);
                })
                .catch((err) => {
                    console.log(err, "save error");
                    res.sendStatus(500);
                })
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
})

app.use('/businesses', AuthRoutes);
// start server
app.listen(PORT, () => {
    console.log(`Server stated on port: ${PORT}`);
});
