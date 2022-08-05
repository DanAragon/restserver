const { response, json } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verify');

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
        if (!validPass) {
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

const googleSignIn = async(req, res = response) => {
    const { id_token } = req.body;
    try {


        const { correo, nombre, img } = await googleVerify(id_token);

        //Generar referencia en la base de datos

        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            //Crear el usuario cuando no existe
            const data = {
                nombre,
                correo,
                pass: 'pass',
                role: 'USER_ROLE',
                img,
                google: true
            };

            usuario = new Usuario(data);
            await usuario.save();

        }

        //Si el usuario en BD 
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'usuario bloqueado'
            })

        }

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log("error", error);
        res.status(400).json({
            ok: false,
            msg: 'El token no se pude verifcar'
        })
    }
}

module.exports = {
    login,
    googleSignIn
}