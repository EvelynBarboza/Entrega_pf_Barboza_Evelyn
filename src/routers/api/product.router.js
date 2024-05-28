const { Router } = require('express'); 
const { productsModel } = require('../../models/products.models.js')
const ProductManagerMongo = require('../../dao/productManagerMongo.js')
const router = Router();


const productService = new ProductManagerMongo();

// OBTENER TODOS LOS PRODUCTOS
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort || '';
    const query = req.query.query || '';

    let products = await productService.getProducts();

    //filtrar por cat o disponibilidad si hay query
    if (query) {
      products = products.filter(product => 
        product.category === query || product.availability === (query === 'true'));
      }

    //ordenar por sort si se especifica sort
    if (sort === 'asc') {
      products.sort((a, b) => a.price - b.price);
    } else if (sort === 'desc') {
      products.sort((a, b) => b.price - a.price);
    }

    const startIndex = (page -1) * limit;
    const endIndex = page * limit;

    const paginatedProducts = products.slice(startIndex, endIndex);

    const totalPages = Math.ceil(products.length / limit);
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;

    const response = {
      status: 'success',
      payload: paginatedProducts,
      totalPages,
      prevPage: hasPrevPage ? page - 1 : null,
      nextPage: hasNextPage ? page + 1 : null,
      page,
      actualPrevPage: hasPrevPage ? page -1 : null,
      actualNextPage: hasNextPage ? page + 1: null,
      prevLink: hasPrevPage ? `/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
      nextLink: hasNextPage ? `/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null,
      };

      res.send(response);
    
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      res.status(500).send({
        status: 'error',
        message: 'ups! ah ocurrido un error al obtener los productos'
      });
     }
});

//obtener producto por id
router.get('/productos/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productService.getProductById(pid);

    if (product) {
      res.json(product);
      } else {
        res.status(404).send('Producto no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener el producto');
        res.status(500).send('ups! ah ocurrido un error...');
  }
});


//crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    if (!title || !description || !code || !price || !category) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const newProduct =  new productsModel ({
      title,
      description,
      code,
      price,
      status: status !== undefined ? status: true,
      stock,
      category,
      thumbnails: thumbnails || []
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//actualizar un producto por id
router.put('/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    const updatedProduct = await productsModel.findByIdAndUpdate(
      productId,
      {
        title, 
        description, 
        code,
        price,
        status,
        stock,
        category,
        thumbnails
      }, 
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'No se encontro el productp'})
    }
    res.json(updatedProduct)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//eliminar producto por id
router.delete('/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    const deletedProduct = await productsModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado con exito'});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router