const { response } = require("express");
const {Producto, Categoria} = require('../models');


const GetProductos =  async (req, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = {estado : true};

    const [total,productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario','nombre')       
        .populate('categoria','nombre')    
        .skip(desde)
            .limit(limite)
    ])

    res.json({
        total,
        productos
    });
}

const GetProductoId = async (req, res = response) => {

    const id = req.params.id;
    
    const producto = await Producto.findById(id).populate('usuario','nombre').populate('categoria','nombre');

    res.json({
        producto
    });
}

const PostProducto = async (req,res = response) => {

    const {estado,usuario, ...body} = req.body;

    const productoDb = await Producto.findOne({nombre:body.nombre});
    // const categoriaDb = await Categoria.findOne({categoria});


    //Validar si ya existe
    if(productoDb){
        return res.status(400).json({
            msg: `El producto ${productoDb.nombre} ya existe`
        })
    }

    //Generar la data a generar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        // categoria: categoriaDb.id,
        usuario:req.usuario.id
    }

    const producto = await Producto(data);

    //Guardar Db
    await producto.save();

    res.status(201).json(producto);

}

const PutProducto = async (req, res = response) => {

    const id = req.params.id;
    const {estado,usuario,...data} = req.body;
    // const categoria = req.body.categoria.toUpperCase();
    // const categoriaDb = await Categoria.findOne({categoria});

    // data.nombre = req.body.nombre.toUpperCase();
    // data.categoria = categoriaDb.id;

    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario.id;
 
    const producto = await Producto.findByIdAndUpdate(id,data,{new:true});

    res.json(producto);
}

const DeleteProducto = async (req, res = response) => {

    const {id} = req.params;

    const producto = await Producto.findByIdAndUpdate(id,{estado:false,disponible:false},{new:true})
   

    res.json({ producto});
}


module.exports = {
    DeleteProducto,
    GetProductoId,
    GetProductos,
    PostProducto,
    PutProducto,
}