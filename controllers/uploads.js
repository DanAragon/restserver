const {response} = require('express');
const {subirArchivo, validarModelo} = require('../helpers');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

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

    let model = await validarModelo(id,coleccion); 

    //Limpiar imagenes previas
    if(model.img){
        console.log(model.img);
        //hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname,'../uploads',coleccion,model.img);
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen);
        }
    }
    
    await subirArchivo(req.files,undefined,coleccion).then((result) => {
        model.img = result;
    }).catch((err) => {return res.status(400).json({msg:err})});

    await model.save();
    res.json(model)
}

const actualizarImgCloudinary = async (req,res = response) =>{

    const {id,coleccion} = req.params;

    let model = await validarModelo(id,coleccion); 

    //Limpiar imagenes previas
    if(model.img){
       const nombreAr = model.img.split('/');
       const nombre = nombreAr[nombreAr.length -1];
       const [public_id] = nombre.split('.')
       cloudinary.uploader.destroy(public_id);
    
    }


    const {tempFilePath} = req.files.archivo;

    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
    
    model.img =secure_url;
    await model.save();
    res.json(model)
}

const mostrarImg = async (req,res = response) =>{
    const {id,coleccion} = req.params;
    let model = await validarModelo(id,coleccion); 

    //Crear path de la imagen y regresarla
    if(model.img){
        const pathImagen = path.join(__dirname,'../uploads',coleccion,model.img);
        if(fs.existsSync(pathImagen)){
            return res.sendFile(pathImagen)
        }
    }
    //si no tiene imagen
    const pathImagen = path.join(__dirname,'../assets','no-image.jpg');
    res.sendFile(pathImagen)
   
   
}

module.exports = {
    cargarArchivo,
    actualizarImg,
    mostrarImg,
    actualizarImgCloudinary
}