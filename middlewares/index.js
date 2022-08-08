const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarRolAdmin, tieneRol } = require("../middlewares/validar-roles");
const {validarArchivoSubir} = require("../middlewares/validar-archivo")


module.exports = {
    tieneRol,
    validarArchivoSubir,
    validarCampos,
    validarJWT,
    validarRolAdmin,
}