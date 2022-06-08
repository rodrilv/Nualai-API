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
  host: "smtp.gmail.com",
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

app.get("/obtener-miembro/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  Miembro.findOne({ _id: id }, { datosPago: 0 }).exec((err, member) => {
    if (err) {
      console.log(err, "Hola soy error");
      res.status(400).json({
        ok: false,
        err,
      });
    } else {
      console.log(member, "Hola sí entré pero no encontré nada");
      res.status(200).json({
        ok: true,
        member,
      });
    }
  });
});

app.post("/registrar", (req, res) => {
  let body = req.body.miembro.datosGenerales;
  console.log(body);
  let year = new Date().getFullYear();
  let i = "NM";
  let d = Math.random() * 999999;
  let id = i + parseInt(d);
  let miembro = new Miembro({
    _id: id,
    datosGenerales: body,
    /*datosGenerales: {
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
      grado_de_estudio: req.body.miembro.datosGenerales.grado_de_estudio
    },*/
    datosEntrevista: {
      medica: "no",
      nutricional: "no",
      fisioterapia: "no",
      psicologica: "no",
    },
    datosPago: {
      mensualidades: [
        {
          folio: `P0${parseInt(Math.random() * 999999)}`,
          mes: "1° Mes",
          fecha: year,
          status: "PENDIENTE",
        },
        {
          folio: `P0${parseInt(Math.random() * 999999)}`,
          mes: "2° Mes",
          fecha: year,
          status: "PENDIENTE",
        },
        {
          folio: `P0${parseInt(Math.random() * 999999)}`,
          mes: "3° Mes",
          fecha: year,
          status: "PENDIENTE",
        },
        {
          folio: `P0${parseInt(Math.random() * 999999)}`,
          mes: "4° Mes",
          fecha: year,
          status: "PENDIENTE",
        },
        {
          folio: `P0${parseInt(Math.random() * 999999)}`,
          mes: "5° Mes",
          fecha: year,
          status: "PENDIENTE",
        },
        {
          folio: `P0${parseInt(Math.random() * 999999)}`,
          mes: "6° Mes",
          fecha: year,
          status: "PENDIENTE",
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

app.put("/agregar-datos-medicos/:id", (req, res) => {
  let body = req.body.datosMedicos;
  let id = req.params.id;
  console.log(body);
  usuarios.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        "datosEntrevista.medica": "si",
        datosMedicos: body,
      },
    },
    {
      upsert: true,
    },
    (err, uDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      } else {
        return res.status(200).json({
          ok: true,
          uDB,
        });
      }
    }
  );
});
app.put("/agregar-datos-nutricionales/:id", (req, res) => {
  let body = req.body.datosNutricionales;
  let id = req.params.id;
  console.log(body);
  usuarios.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        "datosEntrevista.nutricional": "si",
        datosNutricionales: body,
      },
    },
    {
      upsert: true,
    },
    (err, uDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      } else {
        return res.status(200).json({
          ok: true,
          uDB,
        });
      }
    }
  );
});
app.put("/agregar-datos-psicologicos/:id", (req, res) => {
  let body = req.body.datosNutricionales;
  let id = req.params.id;
  console.log(body);
  usuarios.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        "datosEntrevista.psicologica": "si",
        datosPsicologicos: body,
      },
    },
    {
      upsert: true,
    },
    (err, uDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      } else {
        return res.status(200).json({
          ok: true,
          uDB,
        });
      }
    }
  );
});
app.put("/agregar-datos-fisioterapia/:id", (req, res) => {
  let body = req.body.datosFisioterapeuticos;
  let id = req.params.id;
  console.log(body);
  usuarios.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        "datosEntrevista.fisioterapia": "si",
        datosFisioterapeuticos: body,
      },
    },
    {
      upsert: true,
    },
    (err, uDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      } else {
        return res.status(200).json({
          ok: true,
          uDB,
        });
      }
    }
  );
});

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
  let props = {
    nombre: mensualidades[0].nombre,
    motivo: mensualidades[0].mes,
    folio: mensualidades[0].folio,
    fecha: mensualidades[0].fecha,
    monto: body.monto,
    descuento: body.descuento,
    total: body.total,
  };
  let mailOptions = {
    from: "rott.9954@gmail.com",
    to: `${mensualidades[0].correo}`,
    subject: "Recibo de Pago",
    text: "Hola Mundo",
    html: `${temp(props)}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(400).json({
        ok: false,
        message: "I ran but i failed",
      });
    } else {
      res.status(200).json({
        ok: true,
        info,
      });
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
