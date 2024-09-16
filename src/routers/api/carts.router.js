const { Router } = require('express');
const CartController = require ('../../controllers/carts.controllers');
const {passportCall} = require('../../middlewares/passportCall.middleware.js')
const { authenticate} = require('../../middlewares/authorization.middleware.js');

const router = Router();
const cartController = new CartController();

//ENDPOINT Traer un carrito por id
router.get('/:cid', passportCall('jwt'), authenticate(['admin', 'user']), cartController.getCartById);

//ENDPOINT Crear carrito de compras
router.post('/', passportCall('jwt'), cartController.createCart);

// ENDPOINT Agregar producto al carrito
router.post('/:cid/product/:pid', passportCall('jwt'), authenticate(['user']), cartController.addProductToCart);

// ENDPOINT Eliminar producto del carrito
router.delete('/:cid/products/:pid', passportCall('jwt'), authenticate(['user']), cartController.removeProductFromCart);

// ENDPOINT Actualizar el carrito con un arreglo de productos
router.put('/:cid', passportCall('jwt'), authenticate(['user']),cartController.updateCart);

// ENDPOINT Actualizar cantidad de ejemplares de un producto en el carrito
router.put('/:cid/products/:pid', passportCall('jwt'), authenticate(['user']),cartController.updateProductQuantity);

// ENDPOINT Eliminar todos los productos del carrito
router.delete('/:cid', passportCall('jwt'), authenticate(['user']),cartController.clearCart);

// ENDPOINT PARA REALIZAR LA COMPRA DEL CARRITO
router.post('/:cid/purchase', passportCall('jwt'), authenticate(['user']),cartController.purchaseCart)

module.exports = router;