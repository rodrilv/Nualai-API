require("../../config/config");
const express = require("express");
const cors = require("cors");
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
//const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
const _ = require("underscore");
const Personal = require("../../models/personal");
const personal = require("../../models/personal");
const app = express();
//const nodemailer = require("nodemailer");
//const temp = require("../../models/mail-template");
require("../../config/helmet")(app);

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "ok, 200",
  });
});

app.get("/obtener-personal", (req, res) => {
  Personal.find().exec((err, personal) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err,
      });
    } else {
      return res.status(200).json({
        ok: true,
        personal,
      });
    }
  });
});

app.post("/registrar-personal", (req, res) => {
  let body = req.body;
  console.log(body);
  let i = "NP";
  let d = Math.random() * 999999;
  let id = i + parseInt(d);
  let personal = new Personal({
    _id: id,
    datosGenerales: {
      nombres: body.Personal.nombres,
      apellidos: body.Personal.apellidos,
      edad: body.Personal.edad,
      genero: body.Personal.genero,
      domicilio: body.Personal.domicilio,
      telefono: body.Personal.telefono,
      correo: body.Personal.correo,
      rol: body.Personal.rol,
      estado_civil: body.Personal.estado_civil,
    },
  });
  new Personal(personal).save((err, personDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    } else {
      return res.status(201).json({
        ok: true,
        personDB,
      });
    }
  });
});

app.delete("/eliminar-personal/:id", (req, res) => {
  let id = req.params.id;
  personal.findOneAndDelete({ _id: id }, (err) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    } else {
      return res.status(200).json({
        ok: true,
      });
    }
  });
});
app.get("/obtener-personal-rol/:rol", (req, res) => {
  let rol = req.params.rol;
  personal
    .find({ "datosGenerales.rol": rol }, { datosGenerales: 1 })
    .exec((err, personal) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      } else {
        return res.status(200).json({
          ok: true,
          personal,
        });
      }
    });
});
module.exports = app;
