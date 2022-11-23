const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { addProduct, editProduct, deleteProduct, getProducts, getOneProducts } = require('../controllers/product.controller')


const router = Router();

router.get('/', getProducts );
router.get('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    validateFields
],getOneProducts );

router.post('/', [
    check("nombre", 'El nombre es obligatorio').not().isEmpty(),
    check("stock", 'El stock es obligatorio').not().isEmpty(),
    check("price", 'El precio es obligatorio').not().isEmpty(),
    validateFields
],addProduct );

router.put('/:id', [
        check('id', 'No es un id válido').isMongoId(),
        validateFields
],editProduct );

router.delete('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    validateFields
],deleteProduct );

module.exports = router;