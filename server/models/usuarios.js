const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let usuarios = new Schema({
    _id:{
        type: Number,
        required: [true, 'Ingrese un ID para usuario']
    },
    Nombre:{
        type: String,
        required: [true, 'Ingrese un Nombre para usuario']
    },
    Edad:{
        type: Number,
        required: [true, 'Ingrese la Edad para usuario']
    },
    Ocupacion:{
        type: String,
        required: [true, 'Ingrese la Ocupacion para usuario']
    },
    Genero:{
        type: String,
        required: [true, 'Ingrese un Genero para usuario']
    },
    Pass:{
        type: String,
        required: [true, 'Ingresar Password para usuario']
    }
});

usuarios.plugin(uniqueValidator, {
    message: "{PATH} Debe ser unico"
});

module.exports = mongoose.model('usuarios', usuarios);