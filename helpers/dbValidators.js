const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(role = '') => {
    const existeRole = await Role.findOne({ role });
    if (!existeRole) {
        throw new Error(`El ${role} no esta registrado en la base de datos`);
    }
}

const emailExiste = async(correo = '') => {
    console.log("correo:",correo);
    const existecorreo = await Usuario.findOne({ correo });
    console.log("existecorreo:",existecorreo);
    if (existecorreo) {
        throw new Error(`El ${correo} ya esta registrado en la base de datos`);
    }
}

const existeUsuarioPorId = async (id = '') => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id ${id} no existe `);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}