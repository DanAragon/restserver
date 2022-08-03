const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = async (req, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = {estado : true};

    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(desde).limit(limite)
    ])

    res.json({
        total,
        usuarios
    });
}


const usuariosPost = async(req, res = response) => {

    const { nombre, correo, pass, role } = req.body;

    const usuario = new Usuario({ nombre, correo, pass, role });

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.pass = bcryptjs.hashSync(pass, salt);

    //Guardar en la bd
    await usuario.save();

    res.json(usuario);
}

const usuariosPut = async (req, res = response) => {

    const id = req.params.id;

    const {_id,pass,google,correo,...resto} = req.body;
    //TODO validar contra base de datos
    if(pass){
        const salt = bcryptjs.genSaltSync();
        resto.pass = bcryptjs.hashSync(pass, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'patch api - controlador'
    });
}

const usuariosDelete = async (req, res = response) => {

    const {id} = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false})
    const usuarioAutenticado = req.usuario;

    res.json({ usuario, usuarioAutenticado});
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosDelete,
    usuariosPut,
    usuariosPatch
}