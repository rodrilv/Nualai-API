const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let miembroSchema = new Schema({
  _id: {
    type: String,
    required: [true, "Ingrese un ID para usuario"],
  },
  datosGenerales: {
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
    ocupacion: {
      type: String,
      required: [true, "Ingresa una ocupacion para el miembro"],
    },
    estado_civil: {
      type: String,
      required: [true, "Ingresa un estado civil para el miembro"],
    },
    actividad_fisica: {
      type: String,
      required: [true, "Ingresa actividad fisica para el miembro"],
    },
  },
  datosNutricionales:{
    peso:{
      type: String
    },
    estatura:{
      type: String
    },
    LDL:{
      type: String
    },
    HDL:{
      type: String
    },

  }
});

miembroSchema.plugin(uniqueValidator, {
  message: "{PATH} Debe ser unico",
});

module.exports = mongoose.model('Miembro', miembroSchema);
