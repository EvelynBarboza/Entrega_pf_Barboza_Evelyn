const { deleteProduct } = require('../../controllers/products.controllers.js');
const { productsModel } = require('../../models/products.models.js')

class ProductDaoMongo {
    constructor () {
        this.productsModel = productsModel;
    }
    async getAllProducts() {
        return this.productsModel.find();
    }
    async getAllProductsById(id){
        return this.productsModel.findById(id);
    }

    async createProduct(productData) {
        return this.productsModel.create(productData);
    }
    
    async updateProduct(id, productData) {
        return this.productsModel.updateOne({_id: id}, productData);

    }

    async deleteProduct(id){
        return this.productsModel.deleteOne({_id: id})
    }
//para añadir un proucto al carrito
    async addProductToCart(cartId, productId){

    }

//para eliminar un rpoducto del carrito
    async deleteProductCart (cartId, productId){

    }
}

module.exports = { ProductDaoMongo }