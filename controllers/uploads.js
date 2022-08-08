const {response} = require('express');
const {subirArchivo} = require('../helpers');
const {Usuario,Producto} = require('../models')

const cargarArchivo = async (req,res = response) =>{

  //Imagenes
  try {
    const nombreArchivo = await subirArchivo(req.files,undefined,'imgs');
    res.json({
        nombreArchivo
      })
  } catch (error) {
    res.status(400).json({msg:error})
  }
  
}

const actualizarImg = async (req,res = response) =>{


    const {id,coleccion} = req.params;

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

    const nombreArchivo = await subirArchivo(req.files,undefined,coleccion);
    model.img = nombreArchivo;

    await model.save();
 
    res.json(model)
}

module.exports = {
    cargarArchivo,
    actualizarImg
}