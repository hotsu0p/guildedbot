const express = require('express');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
const session = require('express-session');
const { Server } = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

passport.use(new OAuth2Strategy({
    authorizationURL: 'https://www.guilded.gg/oauth2/authorize',
    tokenURL: 'https://www.guilded.gg/oauth2/token',
    clientID: '1cdf5d4b-de21-45d8-890a-eba5da4c3362',
    clientSecret: 'YOUR_CLIENT_SECRET',
    callbackURL: 'http://localhost:3000/auth/callback'
},
function(accessToken, refreshToken, profile, cb) {
    return cb(null, { accessToken });
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/guilded', passport.authenticate('oauth2'));

app.get('/auth/callback', passport.authenticate('oauth2', { failureRedirect: '/' }),
    (req, res) => res.redirect('/dashboard')
);

app.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.sendFile(__dirname + '/dashboard.html');
});

io.on('connection', (socket) => {
    socket.on('send-message', (msg) => {
        // Send message to a specific channel
        client.channels.cache.get('674c3af4-7098-4532-a897-835838731cb7').send(msg);
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
