const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = (req, res = response) => {
    const { q, nombre, apikey } = req.query;
    res.json({
        msg: 'get api - controlador',
        q,
        nombre,
        apikey
    });
}


const usuariosPost = async(req, res = response) => {



    const { nombre, correo, pass, rol } = req.body;

    const usuario = new Usuario({ nombre, correo, pass, rol });

    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        return res.status(400).json({
            msg: 'Ese correo correo esta registrado'
        });
    }

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.pass = bcryptjs.hashSync(pass, salt);

    //Guardar en la bd
    await usuario.save();

    res.json({
        msg: 'post api - controlador',
        usuario
    });
}

const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'put api - controlador',
        id
    });
}

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'patch api - controlador'
    });
}

const usuariosDelete = (req, res = response) => {

    res.json({
        msg: 'delete api - controlador'
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosDelete,
    usuariosPut,
    usuariosPatch
}