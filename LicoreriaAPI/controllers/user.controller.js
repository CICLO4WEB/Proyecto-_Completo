const { response: res, request: req } = require('express');

const bcryptjs = require('bcryptjs')
const Usuario = require('../models/user');
const Product = require('../models/product');
const { generarJWT } = require('../helpers/crear-jwt');

const venta = async (req, res = response) => {

    const { id } = req.params;
    const body = req.body;

    const { ventas } = await Usuario.findById(id);
    const purchaseID = `${id}${ventas.length + 1}`;

    const date = new Date();

    const venta = {
        id: purchaseID,
        cantProductos: body.cantProductos,
        total: body.total,
        productos: body.productos,
        hora: `${date.getHours()}:${date.getMinutes()}`,
        fecha: `${date.toLocaleDateString()}`
    }

    ventas.push(venta);



    try {
        await Usuario.findByIdAndUpdate(id, { ventas });

        // Cambiando el stock de los productos
        body.productos.map(async product => {

            const { stock } = await Product.findById(product.id);
            await Product.findByIdAndUpdate(product.id, { stock: stock - product.cant })

        })
    } catch (error) {
        return res.json({ ok: false, msg: "Hubo un error al realizar la compra" })
    }

    res.json({ ok: true, msg: "Venta exitosa" })

}

// ------------------------------------------ //
// ----------- GET ALL PURCHASES ----------- //
const getPurchases = async (req = request, res = response) => {

    const users = await Usuario.find();
    const purchases = [];

    users.map( user => {
        user.ventas.map( purch => {
            purch.correo = user.correo;
            purchases.push( purch );
        })
    })

    res.json({
        purchases
    })

}

// ------------------------------------------ //
// ------------------ LOGIN ------------------ //
const login = async (req, res = response) => {

    const { correo, password } = req.body;
    try {

        // Email exists
        const userExists = await Usuario.findOne({ correo });
        if (!userExists) {
            return res.status(400).json({
                msg: 'Las credenciales no son correctas',
                ok: false
            })
        }

        // Password is correct
        const validPassword = bcryptjs.compareSync(password, userExists.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Las credenciales no son correctas',
                ok: false
            })
        }

        // User is active
        if (!userExists.estado) {
            return res.status(400).json({
                msg: 'El usuarios se encuentra inactivo',
                ok: false
            })
        }

        // Generate JWT
        const token = await generarJWT(userExists._id, userExists.rol);

        res.json({
            msg: 'Inicio exitoso',
            ok: true,
            user: userExists,
            token
        })

    } catch (error) {
        return res.status(500).json({
            msg: 'Hable con el administrador',
            ok: false
        })

    }

}

// ------------------------------------------ //
// ----------------- CREATE ----------------- //
const postUser = async (req, res) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptación de la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);


    // Save BD
    await usuario.save();

    res.json({
        ok: true,
        usuario
    })

};

// ------------------------------------------ //
// ------------------ READ ------------------ //
const getUsers = async (req, res) => {

    const state = { estado: true }

    const [users] = await Promise.all([
        Usuario.find(state)
    ])

    res.json({
        users
    })

};

// ------------------------------------------ //
// ----------------- UPDATE ----------------- //
const updateUser = async (req, res) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({ usuario })

}

// ------------------------------------------ //
// ----------------- DELETE ----------------- //
const deleteUser = async (req, res) => {

    const { id } = req.params;

    // Eliminación total
    // const user = await Usuario.findByIdAndDelete( id );

    const user = await Usuario.findByIdAndUpdate(id, { estado: false })

    res.json(user)
}



module.exports = {
    getUsers,
    deleteUser,
    postUser,
    updateUser,
    login,
    venta,
    getPurchases
}