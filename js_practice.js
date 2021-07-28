const jwt = require('jsonwebtoken');

const payload = { user: 'admin', role: 'staff' };

const token = jwt.sign(payload, 'somesecretkey');
const data = jwt.verify(token, 'somesecretkey');

payload === data; // true
