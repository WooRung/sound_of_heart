const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const emailValidate = [
  {
    validator: (email) => {
      return validator.isEmail(email);
    },
    message: (props) => {
      return `${props.path} is not email style, got ${props.value}`;
    },
  },
  {
    validator: async (email) => {
      const model = mongoose.model('User');

      // TODO: this.isNew
      // if (this.isNew) {
      const user = await model.find({ email: email });
      return user.length < 1;
      // }
      // return false;
    },
  },
];

const User = new Schema({
  email: {
    type: String,
    required: true,
    validate: emailValidate,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
  },
  isStaff: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },
});

/**
 * Virtuals
 */
User.virtual('password')
  .set(function (pwd) {
    this._password = pwd;
    this.hashed_password = this.createHash(pwd);
  })
  .get(function (pwd) {
    this._password;
  });

User.methods = {
  /**
   *
   * @param {String} password
   * @returns {String}
   */
  createHash: function (password) {
    if (!password) return '';
    return bcrypt.hashSync(password, process.env.SALT_ROUNDS || 10);
  },
};
/**
 * Statics
 */
User.statics = {
  createMember: async function ({ email, password, nickName }) {
    const user = await this.create({ email, password, nickName });
    return user;
  },
  authenticate: async function (email, password) {
    const user = await this.findOne({ email: email });
    if (!user) return false;

    if (bcrypt.compareSync(password, user.hashed_password)) {
      return user;
    }
  },
};

module.exports = mongoose.model('User', User);
