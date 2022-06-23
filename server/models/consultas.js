const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let consultaSchema = new Schema({
  _id: {type: String},
  user_id: { type: String },
  motivo_consulta: {type: String},
  fecha_consulta:{
    day: { type: Number },
    month: { type: Number },
    year: { type: Number }
  },

});

consultaSchema.plugin(uniqueValidator, {
  message: "{PATH} Debe ser unico",
});

module.exports = mongoose.model("consulta", consultaSchema);
