const createError = require('http-errors');

module.exports = (app) => {
  app.use((req, res, next) => {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = err;
    res.status(err.status || 500);
    res.json({
      status: err.status || 500,
      errors: [
        {
          title: err.name,
          message: err.message,
        },
      ],
    });
  });
};
