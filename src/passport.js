const passport = require('passport');

// username - password
const localStrategy = require('passport-local').Strategy;
// token 방식 (Bearer Token)
const bearerStrategy = require('passport-http-bearer').Strategy

const User = require('./models/user');

/**
 * passport = 라우터와 비슷.
 * passport.use(<Strategy>, 
 *              <cb(username, password, done<(err, user, message)>)>
 *             )
 */

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
},(username, password, done)=>{
    // 실제적인 검증 로직
    User.authenticate(username, password).then((data)=>{
        done(null, data);
    }).catch((err)=>{
        done(err)
    })
}));

module.exports = passport;