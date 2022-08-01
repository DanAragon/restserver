const { response } = require('express');
const Usuario = require('../models/usuario');

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

        //generar jwt



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hble con el administrador'
        })
    }

    res.json({
        msg: 'Login ok',
        correo,
        pass
    })
}

module.exports = {
    login
}