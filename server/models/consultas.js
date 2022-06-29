const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let consultaSchema = new Schema({
  _id: { type: String },
  general: {
    nombre: { type: String },
    user_id: { type: String },
    sesion: { type: String },
    fecha_consulta: {
      day: { type: Number },
      month: { type: Number },
      year: { type: Number },
    },
  },
  valoracion_medica: {
    presion_arterial: {
      sistolica: { type: Number },
      distolica: { type: Number },
    },
    signos_vitales: {
      fc: { type: Number },
      fr: { type: Number },
      temperatura_corporal: { type: Number },
    },
    insulina: { type: Number },
    glucosa: { type: Number },
    trigliceridos: { type: Number },
    colesterol: {
      total: { type: String },
      no_hdl: { type: String },
      hdl: { type: String },
      ldl: { type: String },
    },
  },
  valoracion_nutricional: {
    fecha: {
      day: { type: Number },
      month: { type: Number },
      year: { type: Number },
    },
    peso: { type: String },
    estatura: { type: String },
    IMC: { type: String },
    nivel_agua_corporal: { type: String },
    IMM: { type: String },
    edad_biologica: { type: String },
    peso_masa_osea: { type: String },
    cintura: { type: String },
    musculo: { type: String },
    kg_musculo: { type: String },
    grasa: { type: String },
    kg_grasa: { type: String },
    kcal_dta: { type: String },
    macronutrientes: { type: String },
  },
  valoracion_fisioterapia: {
    f_cardiaca: { type: Number },
    subjetivo: { type: String },
    objetivo: { type: String },
    analisis: { type: String },
    plan: { type: String },
    exploracion_fuerza_muscular: { type: String },
  },
});

consultaSchema.plugin(uniqueValidator, {
  message: "{PATH} Debe ser unico",
});

module.exports = mongoose.model("consulta", consultaSchema);
