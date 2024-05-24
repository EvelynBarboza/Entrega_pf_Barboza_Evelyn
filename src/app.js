const express = require('express')
//const fs = require('fs');
const productsRouter = require('../src/routers/product.router.js');
const cartsRouter = require('../src/routers/carts.router.js');
//const ProductManager = require('./productManager.js');
const index = require('../src/config/index.js')

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json())
app.use(express.urlencoded({extenden: true}))
app.use(express.static(__dirname+'/public'))

connectDB()


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);




app.listen(PORT, err => {
  if (err) console.log('Error', err)
  console.log(`Servidor corriendose en puerto ${PORT}`);
});
