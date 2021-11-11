const express = require('express');
const app = express();
require('../config/helmet')(app);

app.use('/usuarios', require('./usuarios/usuarios'));

module.exports = app;