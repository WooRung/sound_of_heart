const User = require('../models/user');

async function createUser(req, res) {
  const { email, password, nickName } = req.body;
  console.log(email, password, nickName);

  const u = User({ email, password, nickName });

  const user = User.create({ email, password, nickName }).exec();

  console.log(user);
  res.json(user);
}

module.exports = {
  createUser,
};
