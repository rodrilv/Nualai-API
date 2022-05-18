require("../../config/config");
const express = require("express");
const cors = require("cors");
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
//const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
const _ = require("underscore");
const usuarios = require("../../models/usuarios");
const Miembro = require("../../models/usuarios");
const app = express();
const nodemailer = require("nodemailer");
const temp = require("../../models/mail-template");
require("../../config/helmet")(app);

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  secure: true,
  port: 465,  
  auth: {
    user: "rott.9954@gmail.com",
    pass: "kggkpzhzngytmprx",
  },
});

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "ok, 200",
  });
});

app.get("/obtener-miembros", (req, res) => {
  Miembro.find().exec((err, members) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    } else {
      //console.log(members);
      return res.status(200).json({
        ok: true,
        members,
      });
    }
  });
});

app.post("/registrar", (req, res) => {
  let year = new Date().getFullYear();
  let i = "NM";
  let d = Math.random() * 999999;
  let id = i + parseInt(d);
  let miembro = new Miembro({
    _id: id,
    datosGenerales: {
      nombres: req.body.miembro.datosGenerales.nombres,
      apellidos: req.body.miembro.datosGenerales.apellidos,
      edad: req.body.miembro.datosGenerales.edad,
      genero: req.body.miembro.datosGenerales.genero,
      domicilio: req.body.miembro.datosGenerales.domicilio,
      telefono: req.body.miembro.datosGenerales.telefono,
      correo: req.body.miembro.datosGenerales.correo,
      ocupacion: req.body.miembro.datosGenerales.ocupacion,
      estado_civil: req.body.miembro.datosGenerales.estado_civil,
      actividad_fisica: req.body.miembro.datosGenerales.actividad_fisica,
    },
    datosPago: {
      mensualidades: [
        {
          folio: `P0${parseInt(Math.random() * 999999)}`,
          mes: "1° Mes",
          fecha: year,
          status: "ADEUDO",
        },
        {
          folio: `P0${parseInt(Math.random() * 999999)}`,
          mes: "2° Mes",
          fecha: year,
          status: "ADEUDO",
        },
        {
          folio: `P0${parseInt(Math.random() * 999999)}`,
          mes: "3° Mes",
          fecha: year,
          status: "ADEUDO",
        },
        {
          folio: `P0${parseInt(Math.random() * 999999)}`,
          mes: "4° Mes",
          fecha: year,
          status: "ADEUDO",
        },
        {
          folio: `P0${parseInt(Math.random() * 999999)}`,
          mes: "5° Mes",
          fecha: year,
          status: "ADEUDO",
        },
        {
          folio: `P0${parseInt(Math.random() * 999999)}`,
          mes: "6° Mes",
          fecha: year,
          status: "ADEUDO",
        },
      ],
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

app.put("/agregar-datos-medicos", (req, res) => {});

app.patch("/pagar-mensualidades/:id", (req, res) => {
  let body = req.body;
  let id = req.params.id;
  let mensualidades = body.datosPago.mensualidades;

  console.log(temp);
  console.log(body);
  console.log(mensualidades[0]);
  usuarios.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        [`datosPago.mensualidades.$[outer].status`]: mensualidades[0].status,
        [`datosPago.mensualidades.$[outer].fecha`]: mensualidades[0].fecha,
      },
    },
    {
      arrayFilters: [{ "outer.mes": mensualidades[0].mes }],
    },
    (err, uDB) => {
      if (err) {
        res.status(400).json({
          ok: false,
        });
      }
      res.status(201).json({
        ok: true,
      });
    }
  );
});
app.post("/enviar-recibo", cors(), (req, res) => {
  let body = req.body;
  let mensualidades = body.datosPago.mensualidades;
  let mailOptions = {
    from: "rott.9954@gmail.com",
    to: `${mensualidades[0].correo}`,
    subject: "Recibo de Pago",
    text: "Hola Mundo",
    html: `${temp(
      mensualidades[0].nombre,
      mensualidades[0].mes,
      mensualidades[0].folio,
      mensualidades[0].fecha,
      body.total
    )}`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if(error){
      res.status(400).json({
        ok: false,
        message: "I ran but i failed"
      })
    }else{
      res.status(200).json({
        ok: true,
        info
      })
    }
  });
});

app.delete("/eliminar-miembro/:id", (req, res) => {
  let id = req.params.id;
  usuarios.findOneAndDelete({ _id: id }, (err) => {
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

module.exports = app;
