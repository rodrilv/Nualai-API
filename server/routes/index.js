const express = require('express');
const app = express();
require('../config/helmet')(app);

//app.use('/usuarios', require('./usuarios/usuarios'));
app.use('/miembros', require('./usuarios/miembros'));
app.use('/personal', require('./personal/personal'));

module.exports = app;