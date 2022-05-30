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
        required: [true, "Ingrese la edad para el miembro"],
      },
      genero: {
        type: String,
        required: [true, "Ingrese un genero para el miembro"],
      },
      domicilio: {
        type: String,
        required: [true, "Ingrese un domicilio para el miembro"],
      },
      telefono: {
        type: String,
        required: [true, "Ingrese un Telefono para el miembro"],
      },
      correo: {
        type: String,
        required: [true, "Ingrese un correo para el miembro"],
      },
      rol: {
        type: String,
        required: [true, "Ingresa un rol para el miembro"],
      },
      estado_civil: {
        type: String,
        required: [true, "Ingresa un estado civil para el miembro"],
      },
  }
});

personalSchema.plugin(uniqueValidator, {
  message: "{PATH} Debe ser unico",
});

module.exports = mongoose.model("Personal", personalSchema);
