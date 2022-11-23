const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { isValidRole, emailExists, idExists } = require('../helpers/db-validators');



// CONTROLLERS
const {
        postUser,
        updateUser,
        deleteUser,
        getUsers,
        login,
        venta,
        getPurchases
    } = require('../controllers/user.controller');

const router = Router();

 // ------------------------------------------ //
// ----------------- LOGIN  ----------------- //
router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
],login );


 // ------------------------------------------ //
// ----------------- CREATE ----------------- //
router.post('/create',[
    check( 'nombre', 'El nombre es obligatorio').not().isEmpty(),
    check( 'correo', 'El correo no es válido').isEmail(),
    check( 'correo' ).custom( emailExists ),
    check( 'password', 'El password debe ser mayor a 6 caracteres').isLength({ min : 6}),
    // check( 'rol', 'No es un rol permitido').isIn(["ADMIN_ROLE","USER_ROLE"]),
    check( 'rol' ).custom( isValidRole ),
    validateFields
], postUser );

 // ------------------------------------------ //
// ------------------ READ ------------------ //
router.get('/allUsers', getUsers)

 // ------------------------------------------ //
// ------------- READ PURCHASES ------------- //
router.get('/ventas', getPurchases)

 // ------------------------------------------ //
// ----------------- UPDATE ----------------- //
router.put('/update/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( idExists ),
    check( 'rol' ).custom( isValidRole ),
    validateFields
], updateUser );

 // ------------------------------------------ //
// ----------------- DELETE ----------------- //
router.delete('/delete/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( idExists ),
    validateFields
], deleteUser );

router.post('/venta/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( idExists ),
    validateFields
], venta );



module.exports = router;