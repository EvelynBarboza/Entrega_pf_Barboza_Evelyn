const productManager = require ('../dao/productDaoMongo.js')

class productController {
    constructor (){
        this.productService = productManager;

    }
//traer todos los productos con paginacion, orden y filtro
getProducts = async (req, res) => {
    try{
      const limit = parseInt(req.query.limit) || 10;
      const page = parseInt(req.query.page) || 1;
      const sort = req.query.sort || '';
      const query = req.query.query || '';

      let products = await this.productService.getAllProducts();
      //si hay query se filtra por cat o disponibilidad
      if (query) {
        products = products.filter(product => product.category === query || product.availability === (query === 'true'))
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
    }

//traer un producto por id
getProduct = async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await this.productService.getProductById(pid);
  
      if (product) {
        res.json(product);
        } else {
          res.status(404).send('Producto no encontrado');
      }
    } catch (error) {
        console.error('Error al obtener el producto');
        res.status(500).send('ups! ah ocurrido un error...');
        }
      
    }

//crear un nuevo producto
    createProduct = async (req, res) => {
      try {
        const productData = req.body;
        const newProduct = await this.productService.createProduct(productData);
        res.status(201).json(newProduct);

      } catch (error) {
        console.error('Error al crear el producto', error);
        res.status(500).send('Ups! ah ocurrido un error inesperado');
      }
    }

//actualizar un producto por id 
    updateProduct = async (req, res) =>{
      try {
        const { pid } = req.params;
        const productData = req.body;
        const updateProduct = await this.productService.updateProduct(pid, productData);
        if(updateProduct) {
          res.status(200).send('Producto actualizado correctsmente');
        } else {
          res.status(404).send('Porducto no encontrado');
        }
      } catch (error) {
          console.error('Error al actualizar el producto', error);
          res.status(500).send('Ups! ah un ocurrido un error inesperado !')
      }
    }
    
//añadir producto al carrito
addProductToCart = async (req, res) =>{
  try {
    const { cid, pid } = req.body;
    const updateCart = await thid.productService.addProductToCart(cid,pid);
    res.status(200).json(updateCart);
  } catch (error) {
    console.error('Error al aañadir el producto al carrito', error);
    res.status(500).send('Ups! ha ocurrido un error', error);
  }
}

//eliminar producto del carrito
deleteProductForCart = async (req, res) =>{
  try {
    const {pid, cid } = req.body;
    const updateCart = await this.productService.deleteProductForCart(cid, pid);
    res.status(200).json(updateCart);
    } catch (error){
      console.error('Error al eliminar tu productpo del carrito', error);
      res.status(500).send('Ups ! ah ocurrido otro error JJ');
    }
}


  //eliminar un producto por id
  deleteProduct= async (req, res) => {
    try {
      const { pid } = req.params;
      const result = await this.productService.deleteProduct(pid);
      if (result) {
        res.status(200).send('Producto no encontrado');

      }else {
        res.status(404).send('producto no encontrado');
      }
    } catch (error) {
        console.error('Error al eliminar el producto', error);
        res.status(500).send('ups! ah ocurrido un error !');
    }
  }
}


module.exports = new productController();