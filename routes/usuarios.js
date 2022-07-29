const e = require("express");
const { Router } = require("express");
const { check } = require("express-validator");
const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
} = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");
const Rol = require('../models/rol');

const router = Router();

router.get('/', usuariosGet);
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('pass', 'La contraseña debe ser mayor a letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('rol').custom(async(rol = '') => {
        console.log("await Rol.findOne({ rol })", await Rol.findOne({ rol }));
        const existeRol = await Rol.findOne({ rol });
        console.log("existeRol", existeRol);
        if (!existeRol) {
            throw new Error(`El ${rol} no esta registrado en la base de datos`);
        }
    }),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROL', 'USER_ROL']),
    validarCampos
], usuariosPost);
router.put('/:id', usuariosPut)
router.patch('/', usuariosPatch)
router.delete('/', usuariosDelete)


module.exports = router;