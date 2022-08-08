const { Router } = require("express");
const { check } = require("express-validator");
const { cargarArchivo, actualizarImg } = require("../controllers/uploads");
const { coleccionesPermitidas } = require("../helpers");
const { validarCampos, validarArchivoSubir } = require("../middlewares");

const router = Router();

//POST img
router.post('/',
    // validarCampos,
    cargarArchivo);

//GET
router.put('/:coleccion/:id',
    [
        validarArchivoSubir,
        check('id','Id debe ser Id de mongo').isMongoId(),
        check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
        validarCampos
    ],
    actualizarImg);


module.exports = router;