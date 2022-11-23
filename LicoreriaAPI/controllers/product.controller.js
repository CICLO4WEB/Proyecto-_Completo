const { response } = require('express');
const Product =require('../models/product');

//GET
const getProducts = async ( req, res = response ) => res.json({products : await Product.find({estado:true})})

//GET ONE
const getOneProducts = async ( req, res = response ) => {
    const { id } = req.params;
    res.json({
        product : await Product.findById(id)
    })
}
// Agregar
const addProduct = async ( req, res = response ) => {

    const body = req.body;

    const productExists = await Product.findOne({ nombre: body.nombre })
    if ( productExists ) {
        return res.status(400).json({ok: false, msg: "El producto ya existe"})
    }

    const newProduct = new Product(body);
    newProduct.save();

    res.json({
        ok: true,
        product: newProduct
    })

}

// Editar
const editProduct = async ( req, res = response ) => {

    const body = req.body;
    const { id } = req.params;

    const product = await Product.findById(id);
    if ( !product ) {
        return res.status(400).json({ok: false, msg: "El producto no existe"})
    }

    const newProduct = await Product.findByIdAndUpdate( id, body );

    res.json({
        ok: true,
        product: newProduct
    })

}

// Eliminar
const deleteProduct = async ( req, res = response ) => {

    const { id } = req.params;

    const product = await Product.findById(id);
    if ( !product ) {
        return res.status(400).json({ok: false, msg: "El producto no existe"})
    }

    await Product.findByIdAndUpdate( id, {estado: false} );

    res.json({
        ok: true,
        msg: "Producto eliminado"
    })

}

module.exports = {
    addProduct,
    editProduct,
    deleteProduct,
    getProducts,
    getOneProducts
}