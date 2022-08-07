const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarRolAdmin, tieneRol } = require("../middlewares/validar-roles");


module.exports = {
    tieneRol,
    validarCampos,
    validarJWT,
    validarRolAdmin,
}