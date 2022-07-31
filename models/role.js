const { Schema, model } = require('mongoose');

const roleSquema = Schema({
    role: {
        type: String,
        require: [true, 'El role es obligatorio']
    }
})

module.exports = model('Role', roleSquema);