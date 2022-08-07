const { Router, json } = require("express");
const { check } = require("express-validator");
const {  PostProducto, GetProductos,GetProductoId, PutProducto, DeleteProducto } = require("../controllers/productos");
const {  existeProducto, existeCategoria } = require("../helpers/dbValidators");
const { validarJWT, validarCampos, validarRolAdmin } = require("../middlewares");

const router = Router();


//Obtener todo
router.get('/', GetProductos);


//Obtener uno por Id
router.get('/:id',[
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
   
  ],GetProductoId);
  

//Crear uno
router.post('/',[
    validarJWT,
    check('nombre','Nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un mongo_id').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
  ],PostProducto);

//Actualizar uno
router.put('/:id',[
    validarJWT,
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
  ],PutProducto);

//Borrar uno
router.delete('/:id',[
    validarJWT,
    validarRolAdmin,
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
   
  ],DeleteProducto);

module.exports = router;