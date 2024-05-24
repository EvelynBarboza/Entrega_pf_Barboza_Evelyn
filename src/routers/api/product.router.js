const { Router } = require('express'); 
const { productsModel } = require('../../models/products.models.js')
const ProductManagerMongo = require('../../dao/productManagerMongo.js')
const router = Router();


//const PRODUCTS_FILE_PATH = '../products.json';
const productService = new ProductManagerMongo();

//router.get('/', async (req, res) =>{
//  const carts = await productService.getCarts()
//  res.send(carts)
//})

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
      actualPrevPage,
      actualNextPage,
      prevLink: hasPrevPage ? `/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
      nextLink: hasNextPage ? `/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null,
      };

      res.send(response);
    
    } catch (error) {
      console.error('Error al obtener los productos');
      res.status(500).send({
        status: 'error',
        message: 'ups! ah ocurrido un error al obtener los productos'
      });
     };
  ////////////////////////////////////////////ok


//obtener producto por id
router.get('/productos/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);

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

//router.get('/:pid', async (req, res) => {
//  try {
//    const data = await fs.readFile(PRODUCTS_FILE_PATH, 'utf8');
//    const products = JSON.parse(data);
//    const product = products.find(p => p.id == req.params.pid);
//    if (product) {
//      res.json(product);
//    } else {
//      res.status(404).json({ error: 'Producto no encontrado' });
//    }
//  } catch (error) {
//    res.status(500).json({ error: error.message });
//  }
//});

router.post('/', async (req, res) => {
  try {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    if (!title || !description || !code || !price || !category) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const data = await fs.readFile(PRODUCTS_FILE_PATH, 'utf8');
    const products = JSON.parse(data);

    const newProduct = {
      id: generateProductId(), 
      title,
      description,
      code,
      price,
      status: status || true,
      stock,
      category,
      thumbnails: thumbnails || [],
    };

    products.push(newProduct);
    await fs.writeFile(PRODUCTS_FILE_PATH, JSON.stringify(products, null, 2));

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    const data = await fs.readFile(PRODUCTS_FILE_PATH, 'utf8');
    let products = JSON.parse(data);

    const index = products.findIndex(product => product.id == productId);

//find = encontrar
    if (index === -1) {
      return res.status(404).json({ error: 'No se encontro el producto' });
    }

    const updatedProduct = {
      id: productId,
      title: title || products[index].title,
      description: description || products[index].description,
      code: code || products[index].code,
      price: price || products[index].price,
      status: status || products[index].status,
      stock: stock || products[index].stock,
      category: category || products[index].category,
      thumbnails: thumbnails || products[index].thumbnails,
    };

    products[index] = updatedProduct;
    await fs.writeFile(PRODUCTS_FILE_PATH, JSON.stringify(products, null, 2));

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;

    const data = await fs.readFile(PRODUCTS_FILE_PATH, 'utf8');
    let products = JSON.parse(data);

    const index = products.findIndex(product => product.id == productId);

    if (index === -1) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    products.splice(index, 1);
    await fs.writeFile(PRODUCTS_FILE_PATH, JSON.stringify(products, null, 2));

    res.json({ message: 'Producto eliminado con exito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})
});

// Función para generar un nuevo ID único
function generateProductId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}


module.exports = router