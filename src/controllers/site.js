/**
 * Rendering 함수.
 *
 * 1. renderSignup
 * 2. renderLogin
 * 3. renderIndex
 * 4. renderVideochat
 */

module.exports = {
  renderSignup: function (req, res) {
    res.render('signup');
  },
  renderLogin: function (req, res) {
    res.render('login');
  },
  renderIndex: function (req, res) {
    res.render('index');
  },
  renderVideochat: function (req, res) {
    res.render('videochat');
  },
};
