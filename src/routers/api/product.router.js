const { Router } = require('express'); 
const productController = require('../../controllers/products.controllers.js');
const {passportCall} = require('../../middlewares/passportCall.middleware.js')
const { authenticate} = require('../../middlewares/authorization.middleware.js');

const router = Router();

router.get('/', productController.getProducts); //todos los productos
router.get('/:pid', productController.getProduct); //un producto por it
router.post('/', passportCall('jwt'), authenticate(['admin']),  productController.createProduct); //crear producto
router.put('/:pid', passportCall('jwt'), authenticate(['admin']), productController.updateProduct); //actualizar un producto
router.delete('/:pid', passportCall('jwt'), authenticate(['admin']), productController.deleteProduct); //eliminar un producto

module.exports = router;