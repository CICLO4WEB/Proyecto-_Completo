 
const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre : {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion : {
        type: String,
    },
    stock: {
        type: Number,
    },
    price: {
        type: Number
    },
    img : {
        type: String,
        default: "https://img.freepik.com/vector-premium/ron-es-bebida-alcoholica-botella-vaso-hielo-sobre-fondo-blanco-dibujos-animados_345837-520.jpg?w=2000"
    },
    estado : {
        type: Boolean,
        default : true
    },
});

module.exports = model( 'Producto', ProductoSchema );