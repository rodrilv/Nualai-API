const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

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
    grado_de_estudio:{
      type: String,
      required: [true, "Ingresa el grado de estudios para el miembro"],
    }
  },
 //datosMedicos
 //datosPsicologicos
 //datosFisioterapeuticos
  datosNutricionales: {
    tratamiento_dietetico:{
      respuesta: {
        type: String
      },
      hace_cuanto:{
        type: String
      }
    },
    apetito:{
      type: String
    },
    funcionamiento_intestinal:{
      type: String
    },
    sintomas_gastrointestinales: {
      respuesta: {
        type: String
      },
      tipo: {
        type: String
      },
      hace_cuanto:{
        type: String
      }
    },
    tabaquismo:{
      respuesta:{
        type: String
      },
      hace_cuanto: {
        type: String
      },
      cuanto:{
        type: String
      }
    },
    alcoholismo:{
      respuesta:{
        type: String
      },
      hace_cuanto: {
        type: String
      },
      cuanto:{
        type: String
      }
    },
    H2O:{
      cantidad:{
        type: String
      }
    },
    prefiere_no_consumir:{
      type: String,
    },
    peso: {
      type: String,
    },
    estatura: {
      type: String,
    },
    LDL: {
      type: String,
    },
    HDL: {
      type: String,
    },
    IMC: {
      type: String
    },
    nivel_agua_corporal:{
      type: String
    },
    IMM: {
      type: String
    },
    edad_biologica: {
      type: String
    },
    peso_masa_osea:{
      type: String
    }
  },
  datosPago:{
    mensualidades: [
      {
        _id: false,
        folio:{
          type: String
        },
        mes:{
          type: String
        },
        fecha:{
          type: String
        },
        status: {
          type: String
        }
      }
    ]
  }
});

miembroSchema.plugin(uniqueValidator, {
  message: "{PATH} Debe ser unico",
});

module.exports = mongoose.model("Miembro", miembroSchema);
