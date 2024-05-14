const { productsModel } = require('../models/products.models')

class ProductManagerFS {
    constructor() {
        this.products = productsModel
    }

//añadir producto o actualizar el carrito
    async addProductToCart(cid, pid) {
        try {
            const cart = await cartModel.findById({_id: cid})
            const index = cart.products.findIndex(product => pid === product.product)
            if (index !== -1) {
                cart.products[index].quantity ++
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }
        await cart.save();
        return cart;

        }catch (error) {
            console.error('Error al añadir producto al carrito:', error);
            throw error;
        }
    
    }

//devuelve los productos ddel carrito
    async getProducts() {
        try {
            const products = await this.products.find();
            return products;
        } catch (error) {
            console.error('Error al obtener productos');
            throw error;
        }
    }

//eliminar productos del carrito
    async deleteProductForCart(cid, pid) {
        try {
            const cart = await cartModel.findById({_id: cid});
            const index = cart.products.findIndex(product => pid === product.product);
            if(index !== -1) {
                const product = cart.products[index];
                if (product.quantity > 1) {
                    product.quantity--;
                } else{
                    cart.products.splice(index, 1);
                }
                await cart.save();
                return cart;
            } else {
                console.log ('El producto no esta en el carrito');
                return cart;
            }
        } catch (error){
            console.error('Error al eliminar el producto del carrito');
            throw error;
        }
}

}

module.exports = ProductManagerFS;