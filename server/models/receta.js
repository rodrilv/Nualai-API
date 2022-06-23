const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let recetaSchema = new Schema({
  _id: {type: String},
  user_id: { type: String },
  nombre: { type: String },
  receta: {type: String},
  motivo_receta: { type: String  },
  fecha_receta:{
    day: { type: Number },
    month: { type: Number },
    year: { type: Number }
  },
});

recetaSchema.plugin(uniqueValidator, {
  message: "{PATH} Debe ser unico",
});

module.exports = mongoose.model("receta", recetaSchema);
