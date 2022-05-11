const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let miembro = new Schema({
  _id: {
    type: String,
    required: [true, "Ingrese un ID para usuario"],
  },
  datosGenerales: [
    {
      nombres: {
        type: String,
        required: [true, "Ingrese un Nombre para el miembro"],
      },
      edad: {
        type: Number,
        required: [true, "Ingrese la Edad para el miembro"],
      },
      apellido_paterno: {
        type: String,
      },
      apellido_materno: {
        type: String,
      },
      telefono: {
        type: String,
        required: [true, "Ingrese un Telefono para el miembro"],
      },
      direccion: {
        type: String,
        required: [true, "Ingrese un Telefono para el miembro"],
      },
    },
  ],
  datosMedicos: [
    {
      presionArterial: [
        {
          sistolica: {
            type: Number,
          },
          distolica: {
            type: Number,
          },
        },
      ],
      glucosa: {
        type: Number,
      },
      trigliceridos: {
        type: Number,
      },
      colesterol: [
        {
          total: {
            type: Number,
          },
          no_hdl: {
            type: Number,
          },
          ldl: {
            type: Number,
          },
          hdl: {
            type: Number,
          },
        },
      ],
      tiroides: [{
          tsh:{
              type: Number
          },
          t3:{
              type: Number
          },
          t4:{
              type: Number
          }
      }],
    },
  ],
});

miembro.plugin(uniqueValidator, {
  message: "{PATH} Debe ser unico",
});

module.exports = mongoose.model("miembro", miembro);
