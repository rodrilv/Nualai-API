const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let datosMedicos = new Schema({
  datosMedicos: {
    presionArterial: {
      sistolica: {
        type: Number,
      },
      distolica: {
        type: Number,
      },
    },
    glucosa: {
      type: Number,
    },
    trigliceridos: {
      type: Number,
    },
    colesterol: {
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
    tiroides: {
      tsh: {
        type: Number,
      },
      t3: {
        type: Number,
      },
      t4: {
        type: Number,
      },
    },
  },
});
