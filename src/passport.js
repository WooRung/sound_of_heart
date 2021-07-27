const passport = require('passport');

// username - password
const localStrategy = require('passport-local').Strategy;
// token 방식 (Bearer Token)
const bearerStrategy = require('passport-http-bearer').Strategy

const User = require('./models/user');

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
},(username, password, done)=>{
    // 실제적인 검증 로직

}))