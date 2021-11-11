require('./config/config');
require('./config/mongoose');
const express = require('express');
const app = express();  
const bodyParser = require('body-parser');
require('./config/helmet')(app);

app.disable('X-Powered-By');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, token'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE'
    );
    next();
});
app.use('/api', require('./routes/index'));

app.listen(process.env.PORT, () => {
    console.log('Escuchando por el puerto', process.env.PORT);
});
