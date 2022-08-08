const { Schema, model } = require('mongoose');

const ProductosSquema = Schema({
    nombre: {
        type: String,
        require: [true, 'El Nombre es obligatorio']
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    precio:{
        type:Number,
        default:0
    },
    categoria:{
        type:Schema.Types.ObjectId,
        ref:'Categoria',
        required:true
    },
    descripcion:{
        type:String,
    },
    disponible:{
        type:Boolean,
        default:true
    },
    img:{
        type: String
    }
})


ProductosSquema.methods.toJSON = function() {
    const { __v,_id,estado, ...data } = this.toObject();
    data.id = _id;
    return data;
}


module.exports = model('Producto', ProductosSquema);