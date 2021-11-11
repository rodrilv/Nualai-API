const mongoose = require('mongoose');
const optionsForMongodb = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 2, // Maintain up to 10 socket connections
    family: 4 // Use IPv4, skip trying IPv6
  }
mongoose.connect(process.env.URLDB, optionsForMongodb, (err) => {
    if (err) throw err;
    console.log('Conectado a BBDD');
});