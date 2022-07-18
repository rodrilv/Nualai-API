const mongoose = require('mongoose');
const optionsForMongodb = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 2, // Maintain up to 10 socket connections
    family: 4 // Use IPv4, skip trying IPv6
  }
  function db(){
    mongoose.connect(process.env.URLDB, optionsForMongodb, (err) => {
      if (err){
        console.log("Conexión fallida, reintentando...")
        db();
      }else{
        console.log('Conectado a BBDD');
      }
  });
  }
  db();
