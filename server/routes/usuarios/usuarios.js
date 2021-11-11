require('../../config/config');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
const _ = require('underscore');
const usuarios = require('../../models/usuarios');
const Usuario = require('../../models/usuarios');
const app = express();
require('../../config/helmet')(app);

app.get('/', (req, res) => {
    return res.status(200).json({
        message: "ok, 200"
    });
});


app.get('/obtener/:id/:pass', (req, res) => {
    let id = req.params.id;
    let pass = req.params.pass
    Usuario.findOne({ _id: id }).exec((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else if (userDB == null) {
            return res.status(409).json({
                ok: false,
                msg: "Error 400"
            })
        } else {
            const Password = bcrypt.compareSync(pass, userDB.Pass);
            if (Password) {
                const expiresIn = 24 * 60 * 60;
                const accessToken = jwt.sign({ id: userDB._id }, process.env.SEED, { expiresIn: expiresIn });
                const usuario = {
                    loginID: userDB._id,
                    name: userDB.name,
                    accessToken: accessToken,
                    expiresIn: expiresIn
                }
                return res.status(200).json({
                    ok: true,
                    usuario
                });

            }else{
                return res.status(400).json({
                    ok: false
                })
            }
            
        }
    });
});

app.post('/registrar', (req, res) => {

    let usuario = new Usuario({
        _id: req.body._id,
        Nombre: req.body.Nombre,
        Edad: req.body.Edad,
        Ocupacion: req.body.Ocupacion,
        Genero: req.body.Genero,
        Pass: bcrypt.hashSync(req.body.Pass)
    });
    console.log(usuario);
    new Usuario(usuario).save((err, userDB) => {
        if (err) {
            console.log("Algo falló en el envío...");
            return res.status(400).json({
                ok: false,
                err
            });

        } else {
            const expiresIn = 24 * 60 * 60;
            const accessToken = jwt.sign({ id: userDB._id },
                process.env.SEED, {
                expiresIn: expiresIn
            });
            const dataUser = {
                loginID: userDB._id,
                name: userDB.name,
                accessToken: accessToken,
                expiresIn: expiresIn
            }
            return res.status(200).json({
                ok: true,
                dataUser
            })
        }
    })

});

app.put('/actualizar/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['Nombre', 'Edad', 'Ocupacion', 'Genero']);
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else {
            return res.status(200).json({
                ok: true,
                userDB
            });
        }
    });
});

app.get('/obtener', (req, res) => {
    Usuario.find().exec((err, users) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        } else {
            return res.status(200).json({
                ok: true,
                users
            })
        }
    })
});

app.delete('/eliminar/:id', (req, res) => {
    let id = req.params.id;
    usuarios.findOneAndDelete({ _id: id }, (err) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else {
            return res.status(200).json({
                ok: true
            })
        }
    });
});
module.exports = app;
