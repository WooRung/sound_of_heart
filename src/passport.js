const passport = require('passport');

// username - password
const localStrategy = require('passport-local').Strategy;
// token 방식 (Bearer Token)
// const bearerStrategy = require('passport-http-bearer').Strategy;

// jwt.verify, jwt.sign 함수.
const jwt = require('jsonwebtoken');
const passportJwt = require('passport-jwt');

const JWTStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const User = require('./models/user');
/**
 * passport = 라우터와 비슷.
 * passport.use(<Strategy>,
 *              <cb(username, password, done<(err, user, message)>)>
 *             )
 */
passport.use(
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (username, password, done) => {
      // 실제적인 검증 로직
      User.authenticate(username, password)
        .then((data) => {
          // --> passport.authenticate로 전달할 유저 객체
          done(null, {
            _id: data._id,
            email: data.email,
            isStaff: data.isStaff,
          });
        })
        .catch((err) => {
          done(err);
        });
    }
  )
);
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
      secretOrKey: process.env.JWT_SECRET,
    },
    function (payload, done) {
      return done(null, payload);
    }
  )
);

/**
 * 로그인시 세션에 정보 저장 내용 Serialize.
 * done에서 호출되는 정보가 세션에 저장됨.
 */
passport.serializeUser((user, done) => {
  return done(
    null,
    JSON.stringify({
      _id: user._id,
      email: user.email,
      isStaff: user.isStaff,
    })
  );
});

/**
 * passport.authenticate가 없는 페이지 접근시 유저 정보 제공
 *
 * @param {user: session에 저장된 user정보, done: 콜백} (user, done)=>void
 */
passport.deserializeUser(async (user, done) => {
  const sessionUser = JSON.parse(user);
  if (!sessionUser) {
    done(null, false);
  }
  try {
    const user_ = await User.findById(sessionUser._id);
    return done(null, user_);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
