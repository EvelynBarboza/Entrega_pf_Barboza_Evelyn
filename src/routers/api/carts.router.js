const { Router } = require('express');
const CartManagerMongo = require('../../dao/cartsDaoMongo.js');

const router = Router();
const cartService = new CartManagerMongo()


//ENDPOINT Traer todos los carritos
router.get('/', async (req, res) =>{
  try {
    const carts = await cartService.getCarts()
    res.send(carts);
  } catch (error) {
    res.status(500).send({error: 'Error al obtener los carritos'})
  }
});

//ENDPOINT Crear carrito de compras
router.post('/', async (req, res) =>{
  try {
    const newCart = await cartService.createCart();
    res.status(201).send(newCart);
  }catch (error) {
    res.status(500).send({error: 'Error al crear el carrito'});
  }
});


//ENDPOINT obtener productos de un carrito (populate)

router.get('/:cid', async (req, res) =>{
  try {
    const cartId = req.params.cid;
    const cart = await cartService.getCartById(cartId);

    if (!cart) {
      return res.status(404).send({ error: 'Carrito no encontrado'});
    }
    res.send(cart);

  } catch {
    res.send.status(404).send({ error: 'Error al obtener el carrito'})
  }
});

// ENDPOINT Agregar producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const updatedCart = await cartService.addProductToCart(cartId, productId);

    if (!updatedCart) {
      return res.status(404).send({ error: 'Carrito no encontrado' });
    }

    res.send(updatedCart);
  } catch (error) {
    res.status(500).send({ error: 'Error al agregar el producto al carrito' });
  }
});

// ENDPOINT Eliminar producto del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const updatedCart = await cartService.removeProductFromCart(cartId, productId);

    if (!updatedCart) {
      return res.status(404).send({ error: 'Carrito no encontrado' });
    }

    res.send(updatedCart);
  } catch (error) {
    res.status(500).send({ error: 'Error al eliminar el producto del carrito' });
  }
});

// ENDPOINT Actualizar el carrito con un arreglo de productos
router.put('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const products = req.body.products;
    const updatedCart = await cartService.updateCart(cartId, products);

    if (!updatedCart) {
      return res.status(404).send({ error: 'Carrito no encontrado' });
    }

    res.send(updatedCart);
  } catch (error) {
    res.status(500).send({ error: 'Error al actualizar el carrito' });
  }
});

// ENDPOINT Actualizar cantidad de ejemplares de un producto en el carrito
router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const { quantity } = req.body;
    const updatedCart = await cartService.updateProductQuantity(cartId, productId, quantity);

    if (!updatedCart) {
      return res.status(404).send({ error: 'Carrito no encontrado' });
    }

    res.send(updatedCart);
  } catch (error) {
    res.status(500).send({ error: 'Error al actualizar la cantidad del producto en el carrito' });
  }
});

// ENDPOINT Eliminar todos los productos del carrito
router.delete('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const updatedCart = await cartService.clearCart(cartId);

    if (!updatedCart) {
      return res.status(404).send({ error: 'Carrito no encontrado' });
    }

    res.send(updatedCart);
  } catch (error) {
    res.status(500).send({ error: 'Error al eliminar los productos del carrito' });
  }
});

module.exports = router;