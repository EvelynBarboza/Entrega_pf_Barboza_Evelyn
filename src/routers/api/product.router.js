const { Router } = require('express'); 
//const { productsModel } = require('../../models/products.models.js')
//const ProductManagerMongo = require('../../dao/productManagerMongo.js')
const productController = require('../../controllers/products.controllers.js');

const router = Router();

router.get('/', productController.getProducts); //todos los productos
router.get('/:pid', productController.getProduct); //un producto por it
router.post('/', productController.createProduct); //crear producto
router.put('/:pid', productController.updateProduct); //actualizar un producto
router.delete('/:pid', productController.deleteProduct); //eliminar un producto

module.exports = router;