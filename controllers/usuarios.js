const { response, request } = require('express');
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


const usuariosPost = async (req, res = response) => {

    
    const body = req.body;
   
    const usuario = new Usuario(body);
    await usuario.save();
    // .then(() => {
    res.json({
        msg: 'post api - controlador',
       usuario
    });
    // }).catch((err) => {console.log(err);});

    
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