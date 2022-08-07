const { response } = require("express");
const {Categoria} = require('../models');


const GetCategorias = async (req, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = {estado : true};

    const [total,categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('usuario','nombre')       
        .skip(desde)
            .limit(limite)
    ])

    res.json({
        total,
        categorias
    });
}

const GetCategoriaId = async (req, res = response) => {

    const id = req.params.id;
    
    const categoria = await Categoria.findById(id).populate('usuario','nombre');

    res.json({
        categoria
    });
}


const CrearCategoria = async (req,res = response) => {
   
    const nombre = req.body.nombre.toUpperCase();


    const categoriaDb = await Categoria.findOne({nombre});

    //Validar si ya existe
    if(categoriaDb){
        return res.status(400).json({
            msg: `La categoria ${categoriaDb.nombre} ya existe`
        })
    }

    //Generar la data a generar
    const data = {
        nombre,
        usuario:req.usuario._id
    }

    const categoria = await Categoria(data);

    //Guardar Db

    await categoria.save();

    res.status(201).json(categoria);

}


const PutCategoria = async (req, res = response) => {

    const id = req.params.id;
    const {estado,usuario,...data} = req.body;

    console.log("usuario",usuario);

    data.nombre = req.body.nombre.toUpperCase();
 
    const categoria = await Categoria.findByIdAndUpdate(id,data,{new:true});

    res.json(categoria);
}

const deleteCategoria = async (req, res = response) => {

    const {id} = req.params;

    const categoria = await Categoria.findByIdAndUpdate(id,{estado:false},{new:true})
   

    res.json({ categoria});
}


module.exports = {
    CrearCategoria,
    GetCategorias,
    GetCategoriaId,
    PutCategoria,
    deleteCategoria
}