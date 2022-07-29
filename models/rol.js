const { Schema, model } = require('mongoose');

const rolSquema = Schema({
    rol: {
        type: String,
        require: [true, 'El rol es obligatorio']
    }
})

module.exports = model('Rol', rolSquema);