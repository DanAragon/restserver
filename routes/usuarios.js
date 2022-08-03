
const { Router } = require("express");
const { check } = require("express-validator");
const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
} = require("../controllers/usuarios");
const { esRoleValido, emailExiste, existeUsuarioPorId } = require("../helpers/dbValidators");

const { validarCampos,
    validarJWT,
    validarRolAdmin,
    tieneRol,} = require( '../middlewares');

const router = Router();

//GET
router.get('/', usuariosGet);

//POST
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('pass', 'La contraseña debe ser mayor a letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('role').custom(esRoleValido),
    validarCampos
], usuariosPost);

//PUT
router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('role').custom(esRoleValido),
    validarCampos
], usuariosPut)

//PATCH
router.patch('/', usuariosPatch)

//DELETE
router.delete('/:id',[
    validarJWT,
    validarRolAdmin,
    tieneRol('ADMIN_ROLE','VENTAS_ROLE','USER_ROLE'),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],
    usuariosDelete)


module.exports = router;