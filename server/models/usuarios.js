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
      required: [true, "Ingrese la edad para el miembro"],
    },
    fecha_de_nacimiento: {
      type: String,
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
    lateralidad_manual: {
      type: String,
      required: [true, "Ingrese su lateralidad manual"],
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
      cancer: {
        respuesta: { type: String },
        tipo: { type: String },
      },
      diabetes: {
        respuesta: { type: String },
        tipo: { type: String },
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
    signos_vitales:{
      fc:{type: Number},
      fr:{type: Number},
      temperatura_corporal:{type: Number}
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
  datosPsicologicos: {
    atendio: { type: String },
    antecedentes_psicologicos: {
      anos_escuela: { type: String },
      tiempo_curso_escuela: { type: String },
      anos_secundaria: { type: String },
      tiempo_curso_secundaria: { type: String },
      problema_escolar: { type: String },
      materias_dificultad: { type: String },
      materias_preferidas: { type: String },
      actividades_tiempo_libre: { type: String },
      repitio_ano: { type: String },
      aprende_facilmente: { type: String },
      edad_primer_noviazgo: { type: String },
      edad_primer_relacion: { type: String },
      dificultades_ley: {
        respuesta: { type: String },
        tipo: { type: String },
      },
      servicio_militar: { type: String },
      catastrofe_natural_guerras: {
        respuesta: { type: String },
        especifica: { type: String },
      },
    },
    informacion_familiar: {
      padre: {
        nombre: { type: String },
        edad: { type: String },
        vivo_muerto: { type: String },
        grado_de_estudio: { type: String },
        ocupacion: { type: String },
        relacion: { type: String },
      },
      madre: {
        nombre: { type: String },
        edad: { type: String },
        vivo_muerto: { type: String },
        grado_de_estudio: { type: String },
        ocupacion: { type: String },
        relacion: { type: String },
      },
      estado_civil_padres: {
        estado_civil: { type: String },
        motivo_separacion: { type: String },
      },
      hermanos: {
        cuantos_varones: { type: String },
        cuantos_mujeres: { type: String },
        posicion_orden_nacimiento: { type: String },
        nombre_hermano_mejor: { type: String },
        motivo: { type: String },
      },
    },
    situacion_economica: { type: String },
    crianza: { type: String },
    hijo_favorito_padres: {
      respuesta: { type: String },
      nombre: { type: String },
    },
    religion_padres: {
      respuesta: { type: String },
      religion: { type: String },
    },
    opinion_padres: { type: String },
    antecedentes_maltrato: { type: String },
    antecedentes_alcoholismo: { type: String },
    casos_depresion: {
      respuesta: { type: String },
      cuales: { type: String },
    },
    observaciones: { type: String },
  },
  datosFisioterapia: {
    atendio: { type: String },
    antecedentes: {
      HTA: { type: String },
      cardiopatia: {
        antecedentes: { type: String },
        respuesta: { type: String },
      },
      reumatologicas: {
        antecedentes: { type: String },
        respuesta: { type: String },
      },
      transfusiones: { type: String },
      accidentes: { type: String },
      fracturas_lesiones: { type: String },
      temperatura_corporal: { type: String },
      fc: { type: String },
      fr: { type: String },
    },
    escala_dolor: {
      respuesta: { type: String },
      donde: { type: String },
      escala: { type: String },
    },
    marcha_deambulacion: { type: String },
    exploracion_fuerza_muscular: { type: String },
    medicion_perimetros: { type: String },
    exploracion_rangos_movimiento: { type: String },
    objetivos_trabajar: { type: String },
    plan_tratamiento: { type: String },
  },
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
    plan_alimentacion:{ type: String }
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
