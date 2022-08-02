const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const {generarJWT} = require('../helpers/generarJWT');

const login = async(req, res = response) => {

    const { correo, pass } = req.body;

    try {

        //verificar si el correo existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        //verificar si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado false'
            })
        }

        //verificar contraseña
        const validPass = bcryptjs.compareSync(pass, usuario.pass);
        if(!validPass){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - password esta mal'
            })
        }

        //generar jwt
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    login
}