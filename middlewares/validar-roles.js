const role = require("../models/role");

const validarRolAdmin =  (req,res = response,next)  =>{

    //Validar usuario
    if(!req.usuario){
        return res.status(500).json({msg:"Se quiere verificar el rol sin validad el token primero"});
    }

    const {role,nombre} = req.usuario;

    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es admin. no puede hacer esta accion `
        })
    }

    next();
}

const tieneRol = (...roles) =>{
    
    return (req,res = response,next) => {
        if(!req.usuario){
            return res.status(500).json({msg:"Se quiere verificar el rol sin validad el token primero"});
        }

        if(!roles.includes(req.usuario.role)){
            return res.status(401).json({msg:`El servicio requiere uno de estos roles ${roles}`});
        }

        next();
    }

}

module.exports = {validarRolAdmin,tieneRol};