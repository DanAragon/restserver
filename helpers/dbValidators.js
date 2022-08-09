const { Categoria,Usuario,Role, Producto } = require('../models');

const esRoleValido = async(role = '') => {
    const existeRole = await Role.findOne({ role });
    if (!existeRole) {
        throw new Error(`El ${role} no esta registrado en la base de datos`);
    }
}

const emailExiste = async(correo = '') => {
    const existecorreo = await Usuario.findOne({ correo });
    if (existecorreo) {
        throw new Error(`El ${correo} ya esta registrado en la base de datos`);
    }
}

const existeUsuarioPorId = async(id = '') => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id ${id} no existe `);
    }
}

const existeCategoria = async (id = '') =>{
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El id ${id} no existe `);
    }
}

const existeProducto = async (id = '') =>{
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El id ${id} no existe `);
    }
}


const coleccionesPermitidas = (coleccion = '',coleccionesPermitidas = []) =>{
    const existeColeccion = coleccionesPermitidas.includes(coleccion);
    if (!existeColeccion) {
        throw new Error(`la coleccion ${coleccion} no existe ${coleccionesPermitidas}`);
    }

    return true;
}

const validarModelo = async (id = '',coleccion = '') => {

     
    let model;

    switch (coleccion) {
        case 'usuarios':
            model = await Usuario.findById(id);
            if(!model){
                return res.status(500).json({msg:'no existe usuario con ese id'});
            }
            break;
        case 'productos':
            model = await Producto.findById(id);
            if(!model){
                return res.status(500).json({msg:'no existe un producto con ese id'});
            }
            break;
        default:
            return res.status(500).json({msg:'la coleccion no existe en el switch lmao'});
    }

    console.log("model",model);

    return model
} 

module.exports = {
    coleccionesPermitidas,
    emailExiste,
    esRoleValido,
    existeCategoria,
    existeProducto,
    existeUsuarioPorId,
    validarModelo,
}