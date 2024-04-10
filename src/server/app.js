import express from 'express';
import productsRouter from '../routes/products.js';
import cartsRouter from '../routes/carts.js';

const app = express();
const PORT = 8080;

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendose en http://localhost:${PORT}`);
});
