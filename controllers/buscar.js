const { response } = require("express");
const { Usuario,Categoria,Producto } = require("../models");
const { ObjectId } = require("mongoose").Types;

const coleccionesPermitidas =  [
    'categorias',
    'productos',
    'roles',
    'usuarios',
];

const buscarUsuarios = async (termino = '' ,res = response) => {
    const esMongoID = ObjectId.isValid(termino);

    if(esMongoID){
        const usuario = await Usuario.findById(termino);
        return res.json({results:usuario ? [usuario]: []})
    }

    const regex = new RegExp(termino,'i')

    const usuarios = await Usuario.find({
        $or:[{nombre:regex},{correo:regex}],
        $and:[{estado:true}]
    })

    const usuariosTotal = await Usuario.count({
        $or:[{nombre:regex},{correo:regex}],
        $and:[{estado:true}]
    })


    return res.json({total:usuariosTotal,results:usuarios})
}

const buscarCategoria = async (termino = '' ,res = response) => {
    const esMongoID = ObjectId.isValid(termino);

    if(esMongoID){
        const categoria = await Categoria.findById(termino);
        return res.json({results:categoria ? [categoria]: []})
    }

    const regex = new RegExp(termino,'i')

    const categorias = await Categoria.find({
        $or:[{nombre:regex,estado:true}]
    })

    const categoriasTotal = await Categoria.count({
        $or:[{nombre:regex,estado:true}]
    })


    return res.json({total:categoriasTotal,results:categorias})
}

const buscarProducto = async (termino = '' ,res = response) => {
    const esMongoID = ObjectId.isValid(termino);

    if(esMongoID){
        const producto = await Producto.findById(termino).populate('categoria','nombre');
        return res.json({results:producto ? [producto]: []})
    }

    const regex = new RegExp(termino,'i')

    const productos = await Producto.find({
        $or:[{nombre:regex}],
        $and:[{estado:true}]
    }).populate('categoria','nombre');

    const productosTotal = await Producto.count({
        $or:[{nombre:regex}],
        $and:[{estado:true}]
    }).populate('categoria','nombre');

    

    return res.json({total:productosTotal,results:productos})
}



const buscar = (req,res = response) => {

    const {coleccion,termino} = req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({msg:`Las colecciones permitidas son ${coleccionesPermitidas}`})
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino,res);
            break;
        case 'categorias':
            buscarCategoria(termino,res);
            break;
        case 'productos':
            buscarProducto(termino,res);
            break;
    
        default:
            res.status(500).json({msg:'Se me olvido hacer esta busqueda'})
            break;
    }
}

module.exports = {
    buscar
};