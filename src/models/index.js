const mongoose = require('mongoose');

module.exports = (cb) => {
  mongoose.connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    cb
  );
};
