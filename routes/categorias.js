const { Router, json } = require("express");
const { check } = require("express-validator");
const { CrearCategoria, GetCategorias, GetCategoriaId, PutCategoria, deleteCategoria } = require("../controllers/categorias");
const { existeCategoria } = require("../helpers/dbValidators");
const { validarJWT, validarCampos, validarRolAdmin } = require("../middlewares");


const router = Router();

/*
  {{url}/api/productos}
*/


//Obtener todo
router.get('/', GetCategorias);

//Obtener uno por Id
router.get('/:id',[
  check('id','No es un id de mongo valido').isMongoId(),
  check('id').custom(existeCategoria),
  validarCampos

],GetCategoriaId);

//Crear uno
router.post('/',[
  validarJWT,
  check('nombre','Nombre es obligatorio').not().isEmpty(),
  validarCampos

],CrearCategoria);

//Borrar uno
router.delete('/:id',[
  validarJWT,
  validarRolAdmin,
  check('nombre','nombre es obligatorio'),
  check('id','No es un id de mongo valido').isMongoId(),
  check('id').custom(existeCategoria),
  validarCampos
 
],deleteCategoria);

//actualizar uno
router.put('/:id',[
  validarJWT,
  check('nombre','nombre es obligatorio'),
  check('id','No es un id de mongo valido').isMongoId(),
  check('id').custom(existeCategoria),
  validarCampos
 
],PutCategoria);


module.exports = router;