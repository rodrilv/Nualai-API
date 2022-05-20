const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let personalSchema = new Schema({
  _id:{
      type: String,
      required: [true, "Ingrese el ID para el personal"]
  },
  datosGenerales:{
    nombres: {
        type: String,
        required: [true, "Ingrese un Nombre para el miembro"],
      },
      apellidos: {
        type: String,
        required: [true, "Ingrese los Apellidos para el miembro"],
      },
      edad: {
        type: Number,
      },
      genero: {
        type: String,
        required: [true, "Ingrese un genero para el miembro"],
      },
      domicilio: {
        type: String,
      },
      telefono: {
        type: String,
        required: [true, "Ingrese un Telefono para el miembro"],
      },
      correo: {
        type: String,
        required: [true, "Ingrese un Telefono para el miembro"],
      },
      escolaridad: {
        type: String,
        required: [true, "Ingresa una ocupacion para el miembro"],
      },
  }
});

personalSchema.plugin(uniqueValidator, {
  message: "{PATH} Debe ser unico",
});

module.exports = mongoose.model("Personal", personalSchema);
