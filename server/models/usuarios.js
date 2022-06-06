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
      required: [true, "Ingrese la edad para el miembro"]
    },
    fecha_de_nacimiento:{
      type: String
    },
    genero: {
      type: String,
      required: [true, "Ingrese un genero para el miembro"],
    },
    domicilio: {
      type: String,
      required: [true, "Ingrese un domicilio para el miembro"],
    },
    lugar_de_nacimiento: {
      type: String,
      required: [true, "Ingrese un Lugar de nacimiento para el miembro"],
    },
    pasatiempos: {
      type: String,
      required: [true, "Ingrese un Lugar de nacimiento para el miembro"],
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
    lateralidad_manual:{
      type: String,
      required: [true, "Ingrese su lateralidad manual"]
    },
    grado_de_estudio: {
      type: String,
      required: [true, "Ingresa el grado de estudios para el miembro"],
    },
  },
  datosEntrevista: {
    medica: {
      type: String,
    },
    nutricional: {
      type: String,
    },
    fisioterapia: {
      type: String,
    },
    psicologica: {
      type: String,
    },
  },
  datosMedicos: {
    atendio: {
      type: String,
    },
    antecedentes_clinicos: {
      alergias: {
        respuesta: {
          type: String,
        },
        tipos: {
          type: String,
        },
      },
      medicamento_regular: {
        respuesta: {
          type: String,
        },
        motivo: {
          type: String,
        },
      },
      enfermedades_infancia: {
        enfermedades: {
          type: String,
        },
      },
      intervenciones_quirurgicas: {
        respuesta: {
          type: String,
        },
        motivo: {
          type: String,
        },
      },
      hospitalizado: {
        respuesta: {
          type: String,
        },
        motivo: {
          type: String,
        },
      },
      vacuna_covid19: {
        respuesta: {
          type: String,
        },
      },
    },
    presion_arterial: {
      sistolica: {
        type: Number,
      },
      distolica: {
        type: Number,
      },
    },
    insulina: {
      type: Number,
    },
    glucosa: {
      type: Number,
    },
    trigliceridos: {
      type: Number,
    },
    colesterol: {
      total: {
        type: String,
      },
      no_hdl: {
        type: String,
      },
      hdl: {
        type: String,
      },
      ldl: {
        type: String,
      },
    },
    tsh: {
      type: String,
    },
    t3: {
      type: String,
    },
    t4: {
      type: String,
    },
  },
  //datosPsicologicos
  //datosFisioterapeuticos
  datosNutricionales: {
    atendio: {
      type: String,
    },
    tratamiento_dietetico: {
      respuesta: {
        type: String,
      },
      hace_cuanto: {
        type: String,
      },
    },
    apetito: {
      type: String,
    },
    funcionamiento_intestinal: {
      type: String,
    },
    sintomas_gastrointestinales: {
      respuesta: {
        type: String,
      },
      tipo: {
        type: String,
      },
      hace_cuanto: {
        type: String,
      },
    },
    tabaquismo: {
      respuesta: {
        type: String,
      },
      hace_cuanto: {
        type: String,
      },
      cuanto: {
        type: String,
      },
    },
    alcoholismo: {
      respuesta: {
        type: String,
      },
      hace_cuanto: {
        type: String,
      },
      cuanto: {
        type: String,
      },
    },
    H2O: {
      cantidad: {
        type: String,
      },
    },
    prefiere_no_consumir: {
      type: String,
    },
    peso: {
      type: String,
    },
    estatura: {
      type: String,
    },
    IMC: {
      type: String,
    },
    nivel_agua_corporal: {
      type: String,
    },
    IMM: {
      type: String,
    },
    edad_biologica: {
      type: String,
    },
    peso_masa_osea: {
      type: String,
    },
  },
  datosPago: {
    mensualidades: [
      {
        _id: false,
        folio: {
          type: String,
        },
        mes: {
          type: String,
        },
        fecha: {
          type: String,
        },
        status: {
          type: String,
        },
      },
    ],
  },
});

miembroSchema.plugin(uniqueValidator, {
  message: "{PATH} Debe ser unico",
});

module.exports = mongoose.model("Miembro", miembroSchema);
