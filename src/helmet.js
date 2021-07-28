const helmet = require('helmet');
module.exports = (app) => {
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: [
            "'self'",
            'https://kit.fontawesome.com',
            'https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js',
            'https://unpkg.com',
            "'unsafe-inline'",
          ],
          styleSrc: [
            "'self'",
            'https://fonts.googleapis.com',
            'https://getbootstrap.com',
            "'unsafe-inline'",
          ],
          imgSrc: ["'self'", 'data:'],
          connectSrc: ["'self'", 'https://ka-f.fontawesome.com'],
          fontSrc: [
            "'self'",
            'https://fonts.gstatic.com',
            'https://ka-f.fontawesome.com',
          ],
          objectSrc: ["'self'"],
          mediaSrc: ["'self'"],
          frameSrc: ["'self'"],
        },
      },
    })
  );
};
