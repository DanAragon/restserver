const { response, request } = require('express')

const usuariosGet = (req, res = response) => {
    const { q, nombre, apikey } = req.query;
    res.json({
        msg: 'get api - controlador',
        q,
        nombre,
        apikey
    });
}


const usuariosPost = (req, res = response) => {


    res.json({
        msg: 'post api - controlador'
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