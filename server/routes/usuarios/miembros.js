require("../../config/config");
require('dotenv').config()
const express = require("express");
const cors = require("cors");
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
//const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
const _ = require("underscore");
const usuarios = require("../../models/usuarios");
const Miembro = require("../../models/usuarios");
const Receta = require("../../models/receta");
const Consulta = require("../../models/consultas");
const app = express();
const nodemailer = require("nodemailer");
const temp = require("../../models/mail-template");
require("../../config/helmet")(app);

const transporter = nodemailer.createTransport({
  host: `${process.env.HOST}`,
  secure: true,
  port: process.env.SMTP_PORT,
  auth: {
    user: `${process.env.USER}`,
    pass: `${process.env.PASS}`,
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
      return res.status(200).json({
        ok: true,
        members,
      });
    }
  });
});
app.get("/obtener-consultas", (req, res) => {
  Consulta.find({}, {}).exec((err, consultas) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    } else {
      return res.status(200).json({
        ok: true,
        consultas,
      });
    }
  });
});
app.get("/obtener-consultas-miembro/:uid", (req, res) => {
  let uid = req.params.uid;
  Consulta.find({ "general.user_id": uid }).exec((err, consultas) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    } else {
      return res.status(200).json({
        ok: true,
        consultas,
      });
    }
  });
});
app.get("/obtener-consulta-miembro/:cid", (req, res) => {
  let id = req.params.cid;
  Consulta.findOne({ _id: id }).exec((err, consulta) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    } else {
      return res.status(200).json({
        ok: true,
        consulta,
      });
    }
  });
});
app.get("/obtener-miembro/:id", (req, res) => {
  let id = req.params.id;
  Miembro.findOne({ _id: id }, { datosPago: 0 }).exec((err, member) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    } else {
      return res.status(200).json({
        ok: true,
        member,
      });
    }
  });
});
app.get("/obtener-recetas/:uid", (req, res) => {
  let uid = req.params.uid;
  Receta.find({ user_id: uid }).exec((err, prescripts) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        error,
      });
    } else {
      return res.status(200).json({
        ok: true,
        prescripts,
      });
    }
  });
});
app.get("/obtener-receta/:uid/:rid", (req, res) => {
  let uid = req.params.uid;
  let rid = req.params.rid;
  Receta.findOne({ _id: rid, user_id: uid }).exec((err, prescript) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    } else {
      return res.status(200).json({
        ok: true,
        prescript,
      });
    }
  });
});
app.get("/obtener-ultima-consulta/:id", (req, res) => {
  let id = req.params.id;
  Consulta.find(
    {
      $and: [
        { "general.sesion": { $ne: "Entrevista" } },
        { "general.user_id": id },
      ],
    },
    { "general.sesion": 1 }
  )
    .sort({ "general.sesion": -1 })
    .limit(1)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          ok: false,
        });
      } else {
        return res.status(200).json({
          ok: true,
          data,
        });
      }
    });
});
app.post("/crear-consulta", (req, res) => {
  let d = Math.random() * 999999999;
  let i = "CS";
  let id = i + parseInt(d);
  let body = req.body.consulta.general;
  let consulta = new Consulta({
    _id: id,
    general: body,
    valoracion_medica: {
      status: "Pendiente",
    },
    valoracion_nutricional: {
      status: "Pendiente",
    },
    valoracion_fisioterapia: {
      status: "Pendiente",
    },
  });
  new Consulta(consulta).save((err, consDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    } else {
      return res.status(200).json({
        ok: true,
        consDB,
      });
    }
  });
});
app.post("/registrar", (req, res) => {
  let body = req.body.miembro.datosGenerales;
  let year = new Date().getFullYear();
  let d = Math.random() * 999999;
  let i = "NM";
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
          mes: "1?? Mes",
          fecha: year,
          status: "PENDIENTE",
        },
        {
          folio: `P0${parseInt(Math.random() * 999999)}`,
          mes: "2?? Mes",
          fecha: year,
          status: "PENDIENTE",
        },
        {
          folio: `P0${parseInt(Math.random() * 999999)}`,
          mes: "3?? Mes",
          fecha: year,
          status: "PENDIENTE",
        },
        {
          folio: `P0${parseInt(Math.random() * 999999)}`,
          mes: "4?? Mes",
          fecha: year,
          status: "PENDIENTE",
        },
        {
          folio: `P0${parseInt(Math.random() * 999999)}`,
          mes: "5?? Mes",
          fecha: year,
          status: "PENDIENTE",
        },
        {
          folio: `P0${parseInt(Math.random() * 999999)}`,
          mes: "6?? Mes",
          fecha: year,
          status: "PENDIENTE",
        },
        {
          folio: `P0${parseInt(Math.random() * 999999)}`,
          mes: "7?? Mes",
          fecha: year,
          status: "PENDIENTE",
        },
        {
          folio: `P0${parseInt(Math.random() * 999999)}`,
          mes: "8?? Mes",
          fecha: year,
          status: "PENDIENTE",
        },
        {
          folio: `P0${parseInt(Math.random() * 999999)}`,
          mes: "9?? Mes",
          fecha: year,
          status: "PENDIENTE",
        },
        {
          folio: `P0${parseInt(Math.random() * 999999)}`,
          mes: "10?? Mes",
          fecha: year,
          status: "PENDIENTE",
        },
        {
          folio: `P0${parseInt(Math.random() * 999999)}`,
          mes: "11?? Mes",
          fecha: year,
          status: "PENDIENTE",
        },
        {
          folio: `P0${parseInt(Math.random() * 999999)}`,
          mes: "12?? Mes",
          fecha: year,
          status: "PENDIENTE",
        },
      ],
    },
  });
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
app.post("/guardar-receta", (req, res) => {
  let body = req.body;
  let i = "PR";
  let d = Math.random() * 999999;
  let id = i + parseInt(d);
  let receta = new Receta({
    _id: id,
    user_id: body.receta.member_id,
    nombre: body.receta.nombre,
    motivo_receta: body.receta.motivo_receta,
    receta: body.receta.receta,
    fecha_receta: {
      day: body.receta.fecha_receta.day,
      month: body.receta.fecha_receta.month,
      year: body.receta.fecha_receta.year,
    },
  });
  new Receta(receta).save((err, recetaDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    } else {
      return res.status(200).json({
        ok: true,
        recetaDB,
      });
    }
  });
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
    from: "Nualai Clinica",
    to: `${mensualidades[0].correo}`,
    subject: "Recibo de Pago",
    text: "Hola Mundo",
    html: `${temp(props)}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(process.env.SMTP_PORT, process.env.USER, process.env.PASS);
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
app.post("/enviar-recordatorio/:correo", cors(), (req, res) => {
  let correo = req.params.correo;
  let body = req.body;
  let uid = body.user_id;
  let name = body.nombre;
  let cita =
    body.fecha_consulta.day +
    "/" +
    body.fecha_consulta.month +
    "/" +
    body.fecha_consulta.year +
    " a las " +
    body.hora +
    " horas.";
  let mailOptions = {
    from: "Nualai Clinica",
    to: `${correo}`,
    subject: "RECORDATORIO DE CONSULTA",
    text: `Por este medio, ${name} con matr??cula ${uid}, le recordamos que usted tiene una cita programada para el ${cita}. \n Le agradecer??amos que nos pudiera confirmar su asistencia, de modo contrario poder comunicarse con nosotros para reagendar su cita. \n Saludos cordiales. \n \n Equipo Nualai.`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(401).json({
        ok: false,
        error: `Unable to send email`,
      });
    } else {
      return res.status(200).json({
        ok: true,
      });
    }
  });
});
app.put("/agregar-datos-medicos/:id", (req, res) => {
  let body = req.body.datosMedicos;
  let id = req.params.id;
  usuarios.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        "datosEntrevista.medica": "si",
        datosMedicos: body,
      },
    },
    {
      upsert: false,
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
  usuarios.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        "datosEntrevista.nutricional": "si",
        datosNutricionales: body,
      },
    },
    {
      upsert: false,
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
  let body = req.body.datosPsicologicos;
  let id = req.params.id;
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
  let body = req.body.datosFisioterapia;
  let id = req.params.id;
  usuarios.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        "datosEntrevista.fisioterapia": "si",
        datosFisioterapia: body,
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
app.put("/agregar-plan-alimentacion/:id", (req, res) => {
  let body = req.body.plan_alimentacion;
  let id = req.params.id;
  usuarios.findOneAndUpdate(
    { _id: id },
    { $set: { "datosNutricionales.plan_alimentacion": body } },
    { upsert: true },
    (err, plan) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      } else {
        return res.status(200).json({
          ok: true,
          plan,
        });
      }
    }
  );
});
app.put("/agregar-plan-alimentacion-consulta/:id", (req, res) => {
  let body = req.body.plan_alimentacion;
  let id = req.params.id;
  Consulta.findOneAndUpdate(
    { _id: id },
    { $set: { "valoracion_nutricional.plan_alimentacion": body } },
    { upsert: true },
    (err, update) => {
      if (err) {
        return res.status(400).json({
          ok: false,
        });
      } else {
        return res.status(200).json({
          ok: true,
        });
      }
    }
  );
});
app.put("/agregar-consulta-medica/:cid", (req, res) => {
  let id = req.params.cid;
  let body = req.body;
  Consulta.findOneAndUpdate(
    { _id: id },
    { $set: { valoracion_medica: body.valoracion_medica } },
    { upsert: true },
    (err, consultaMedica) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      } else {
        return res.status(200).json({
          ok: true,
          consultaMedica,
        });
      }
    }
  );
});
app.put("/agregar-consulta-nutricional/:cid", (req, res) => {
  let id = req.params.cid;
  let body = req.body;
  Consulta.findOneAndUpdate(
    { _id: id },
    { $set: { valoracion_nutricional: body.valoracion_nutricional } },
    { upsert: true },
    (err, consultaNutricional) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      } else {
        return res.status(200).json({
          ok: true,
          consultaNutricional,
        });
      }
    }
  );
});
app.put("/agregar-consulta-fisioterapia/:cid", (req, res) => {
  let id = req.params.cid;
  let body = req.body;
  Consulta.findOneAndUpdate(
    { _id: id },
    { $set: { valoracion_fisioterapia: body.valoracion_fisioterapia } },
    { upsert: true },
    (err, consultaFisio) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      } else {
        return res.status(200).json({
          ok: true,
          consultaFisio,
        });
      }
    }
  );
});
app.patch("/pagar-mensualidades/:id", (req, res) => {
  let body = req.body;
  let id = req.params.id;
  let mensualidades = body.datosPago.mensualidades;
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
app.patch("/actualizar-consulta/:id", (req, res) => {
  let body = req.body;
  let id = req.params.id;
  Consulta.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        "general.fecha_consulta.day": body.fecha[2],
        "general.fecha_consulta.month": body.fecha[1],
        "general.fecha_consulta.year": body.fecha[0],
        "general.hora": body.hora,
      },
    },
    { upsert: false },
    (err, updDB) => {
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
    }
  );
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
