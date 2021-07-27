const User = require('../models/user');

async function createUser(req, res, next) {
  const { email, password, nickName } = req.body;
  try {
    const user = await User.createMember({ email, password, nickName });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createUser,
};
