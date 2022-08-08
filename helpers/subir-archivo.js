const { v4: uuidv4 } = require('uuid');
const path = require('path');

const subirArchivo = (files,extensionesValidas =['png','jpeg','jpg','gif'], carpeta = '') =>{
 
    return new Promise ((resolve,reject) => {
        const {archivo} = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length-1];

        //Validar la extension
        if(!extensionesValidas.includes(extension)){
             reject(`la extension .${extension} no esta permitida - ${extensionesValidas}`);
             return
        }

        const nombreTempArchivo = uuidv4()+'.'+extension;
        const uploadPath = path.join( __dirname ,'../uploads/',carpeta , nombreTempArchivo);

        archivo.mv(uploadPath, (err) => {
                if (err) {
                    reject(err);
                }

                resolve(nombreTempArchivo);
            })
        });
}

module.exports = {
    subirArchivo
}