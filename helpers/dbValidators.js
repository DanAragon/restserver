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

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto
}