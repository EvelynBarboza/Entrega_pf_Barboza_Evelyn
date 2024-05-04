const express = require('express')
const fs = require('fs');
const productsRouter = require('../src/routers/product.router.js');
const cartsRouter = require('../src/routers/carts.router.js');
const ProductManager = require('./productManager.js');


const app = express();
const PORT = 8080;

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendose en puerto ${PORT}`);
});
