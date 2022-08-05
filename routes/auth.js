const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

//GET
router.post('/login',
    check('correo', 'El correo es obligatorio').isEmail(),
    check('pass', 'La contraseña es obligatoria').isLength({ min: 6 }),
    validarCampos,
    login);

router.post('/google', [
    check('id_token', 'id_token es necesario').not().isEmpty(),
    googleSignIn
]);

module.exports = router;