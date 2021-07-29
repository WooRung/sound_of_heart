/**
 * Rendering 함수.
 *
 * 1. renderSignup
 * 2. renderLogin
 * 3. renderIndex
 * 4. renderVideochat
 * 5. getVideochatId
 */
const { v4: uuidv4 } = require('uuid');

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
    const { chatId } = req.params;
    res.render('videochat', { roomId: chatId, user: req.user });
  },
  getVideochatId: (preUrl) =>
    function (req, res) {
      res.redirect(`${preUrl}/${uuidv4()}`);
    },
};
