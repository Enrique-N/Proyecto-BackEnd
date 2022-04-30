let express = require('express');
let loginRoute = express.Router();
let expressSession = require('express-session');
let passport = require('passport');
let passportStrategy = require('passport-local').Strategy;
let bcrypt = require('bcrypt');
let logger = require("../../utils/log4js");
let { db: firebaseDB } = require("../../utils/firebase")
let usuarios = [];

loginRoute.use(express.json());
loginRoute.use(express.urlencoded({ extended: true }));

passport.use('signin', new passportStrategy(async (username, password, done) => {

    let usuariosDB = await firebaseDB.collection('usuarios').get();
    let doc = usuariosDB.docs;
    doc.map((doc) => {
        usuarios.push(doc.data())
    })

    let user = usuarios.find(usuario => usuario.username == username);

    if (!user) return done(null, false);

    if (!bcrypt.compareSync(password, user.password)) return done(null, false);

    return done(null, user);
}));

passport.use('register', new passportStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
    let userfind = usuarios.find(usuario => usuario.username == username);
    if (userfind) return done("Usuario ya registrado");

    let user = {
        username,
        password: bcrypt.hashSync(password, 10),
        phone: req.body.phone,
        edad: req.body.edad,
        avatar: req.body.imgdata
    }
    let users = firebaseDB.collection('usuarios');
    await users.doc().set(user)
    return done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
    let user = [];
    let usuariosDB = await firebaseDB.collection('usuarios').get();
    let doc = usuariosDB.docs;
    doc.map((doc) => {
        user.push(doc.data())
    })
    let find = user.find(usuario => usuario.username == username)
    done(null, find);
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

loginRoute.post('/registro', passport.authenticate('register', { failureRedirect: 'signin/error', successRedirect: '/signin/login' }));

loginRoute.get('/', (req, res, next) => {
    res.render('signin');
});


loginRoute.post('/', passport.authenticate('signin', { failureRedirect: 'signin/registro', successRedirect: '/signin/login' }));

loginRoute.get("/error", (req, res) => {
    res.render("error")
});

loginRoute.get('/login', isAuth, (req, res, next) => {
    logger.info(`Bienvenido ${req.user.username}`);
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