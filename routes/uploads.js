const { Router } = require("express");
const { check } = require("express-validator");
const { cargarArchivo, actualizarImg, mostrarImg, actualizarImgCloudinary } = require("../controllers/uploads");
const { coleccionesPermitidas } = require("../helpers");
const { validarCampos, validarArchivoSubir } = require("../middlewares");

const router = Router();

//GET img
router.get('/:coleccion/:id',
    [
        check('id','Id debe ser Id de mongo').isMongoId(),
        check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
        validarCampos
    ],
    mostrarImg);

//POST img
router.post('/',
    // validarCampos,
    cargarArchivo);

//PUT img
router.put('/:coleccion/:id',
    [
        validarArchivoSubir,
        check('id','Id debe ser Id de mongo').isMongoId(),
        check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
        validarCampos
    ],actualizarImgCloudinary);
    // actualizarImg);


module.exports = router;