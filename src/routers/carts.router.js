//const express = require('express')
//const fs = require('fs');
//const CARTS_FILE_PATH = '../carts.json';
const { Router } = require('express');
//const carrito = require('../models/cart.models.js')
const CartManagerMongo = require('../dao/cartsManagerMongo');

const router = Router();
const cartService = new CartManagerMongo()

//ENDPOINT Traer todos los carritos
router.get('/', async (req, res) =>{
  const carts = await cartService.getCarts()
  res.send(carts)
})

//ENDPOINT Crear carrito de compras
router.post('/', async (req, res) =>{
  try {
    const newCart = await cartService.createCart();
    res.status(201).send(newCart);
  }catch (error) {
    res.status(500).send({error: 'Error'});
  }
})










router.post('/', async (req, res) => {
  try {
    const data = await fs.readFile(CARTS_FILE_PATH, 'utf8');
    let carts = JSON.parse(data);

    const newCart = {
      id: generateCartId(),
      products: [],
    };

    carts.push(newCart);
    await fs.writeFile(CARTS_FILE_PATH, JSON.stringify(carts, null, 2));

    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;

    const data = await fs.readFile(CARTS_FILE_PATH, 'utf8');
    const carts = JSON.parse(data);

    const cart = carts.find(cart => cart.id == cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.json(cart.products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const data = await fs.readFile(CARTS_FILE_PATH, 'utf8');
    let carts = JSON.parse(data);

    const cartIndex = carts.findIndex(cart => cart.id == cartId);

    if (cartIndex === -1) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const productIndex = carts[cartIndex].products.findIndex(product => product.id == productId);

    if (productIndex === -1) {
      // Si el producto no esta en el carrito, que se agregue
      carts[cartIndex].products.push({
        id: productId,
        quantity: 1,
      });
    } else {
      // Si el producto ya esta en el carrito, aumenta la cantidad
      carts[cartIndex].products[productIndex].quantity++;
    }

    await fs.writeFile(CARTS_FILE_PATH, JSON.stringify(carts, null, 2));

    res.json(carts[cartIndex].products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// funtion para crear id de carrito unico 
function generateCartId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}



module.exports = router;