require("../../config/config");
const express = require("express");
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
//const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
const _ = require("underscore");
const usuarios = require("../../models/usuarios");
const Miembro = require("../../models/usuarios");
const app = express();
require("../../config/helmet")(app);

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "ok, 200",
  });
});

app.get("/obtener-miembros", (req, res) =>{
  Miembro.find().exec((err, members) =>{
    if(err){
      return res.status(400).json({
        ok: false,
        err
      })
    }else{
      console.log(members);
      return res.status(200).json({
        ok: true,
        members
      })
    }
  })
})

app.post("/registrar", (req, res) => {
  let i = "NM";
  let d = Math.random() * 999999;
  let id = i + parseInt(d);
  let miembro = new Miembro({
    _id: id,
    datosGenerales: {
      nombres: req.body.miembro.datosGenerales.nombres,
      apellidos: req.body.miembro.datosGenerales.apellidos,
      edad: req.body.miembro.datosGenerales.edad,
      domicilio: req.body.miembro.datosGenerales.domicilio,
      telefono: req.body.miembro.datosGenerales.telefono,
      correo: req.body.miembro.datosGenerales.correo,
      ocupacion: req.body.miembro.datosGenerales.ocupacion,
      estado_civil: req.body.miembro.datosGenerales.estado_civil,
      actividad_fisica: req.body.miembro.datosGenerales.actividad_fisica,
    },
  });
  console.log(miembro);
  new Miembro(miembro).save((err, memDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    } else {
      return res.status(200).json({
        ok: true,
        memDB,
      });
    }
  });
});

app.put("/agregar-datos-medicos", (req, res) =>{

})

app.delete("/eliminar-miembro/:id", (req, res) =>{
  let id = req.params.id;
  usuarios.findOneAndDelete({_id: id}, (err) =>{
    if(err){
      return res.status(400).json({
        ok: false,
        err
      })
    }else{
      return res.status(200).json({
        ok: true
      })
    }
  })
})

module.exports = app;
