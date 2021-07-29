module.exports = {
  loginUserRedirect: (redirectUrl) => {
    return (req, res, next) => {
      if (!req.user) {
        next();
      } else {
        res.redirect(redirectUrl);
      }
    };
  },
};
