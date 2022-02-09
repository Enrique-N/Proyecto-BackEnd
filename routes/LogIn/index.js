let express = require('express');
let loginRoute = express.Router();
let expressSession = require('express-session');
let passport = require('passport');
let passportStrategy = require('passport-local').Strategy;
let bcrypt = require('bcrypt');
let usuarios = [];

loginRoute.use(express.urlencoded({ extended: true }));
loginRoute.use(express.json());

passport.use('signin', new passportStrategy((username, password, done) => {
    let user = usuarios.find(usuario => usuario.username == username);

    if (!user) return done(null, false);

    if (!bcrypt.compareSync(password, user.password)) return done(null, false);

    return done(null, user);
}));

passport.use('register', new passportStrategy((username, password, done) => {
    let userfind = usuarios.find(usuario => usuario.username == username);
    if (userfind) return done("Usuario ya registrado");

    let user = {
        username,
        password: bcrypt.hashSync(password, 10)
    }
    usuarios.push(user);
    return done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    let user = usuarios.find(usuario => usuario.username == username);
    done(null, user);
});


loginRoute.use(expressSession({
    secret: "secret",
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 6000
    },
    resave: false,
    saveUninitialized: false
}));

loginRoute.use(passport.initialize());
loginRoute.use(passport.session());


let isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};

let isNotAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/signin/login');
    }
};

loginRoute.get('/registro', isNotAuth, (req, res, next) => {
    res.render('registro');
});

loginRoute.post('/registro', passport.authenticate('register', { failureRedirect: 'signin/error', successRedirect: 'login' }));

loginRoute.get('/', (req, res, next) => {
    res.render('signin');
});


loginRoute.post('/', passport.authenticate('signin', { failureRedirect: 'signin/registro', successRedirect: '/signin/login' }));

loginRoute.get("/error", (req, res) => {
    res.render("error")
});

loginRoute.get('/login', isAuth, (req, res, next) => {
    res.render('index', {
        usuario: req.user
    });
});

loginRoute.get('/logout', (req, res, next) => {
    req.session.destroy(err => {
        if (err) res.send(JSON.stringify(err));
        res.redirect('/');
    });
});

module.exports = loginRoute;