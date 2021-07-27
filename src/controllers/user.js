const User = require('../models/user');

async function createUser(req, res) {
  const { email, password, nickName } = req.body;
  const user = User.create({ email, password, nickName }).exec();
  res.json(user);
}

module.exports = {
  createUser,
};
