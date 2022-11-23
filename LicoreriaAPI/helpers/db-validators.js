const Role = require('../models/role');
const Usuario = require('../models/user');

const isValidRole = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error( `El rol ${ rol } no se encuenta registrado` );
    }
}

// Verificar si el correo existe
const emailExists = async ( correo = '' ) => {
    
    const emailExist = await Usuario.findOne({ correo });
    if ( emailExist ) {
        throw new Error( `El correo ya se encuentra registrado` );
    }
};

// Verificar si un usuario existe
const idExists = async ( id ) => {
    
    const validation = await Usuario.findById( id );
    if ( !validation ) {
        throw new Error( `El usuario no se encuentra registrado` );
    }
}


module.exports = {
    isValidRole,
    emailExists,
    idExists,
}
