const { cartsModel } = require('../models/cart.models')

class CartManagerMongo {
    constructor() {
        this.model = cartsModel;
    }
    
    async getCarts() {
        try { 
            const carts = await this.model.find()
            return carts;
        } catch (error) {
            console.error('Error al obtener carritos')
            throw error;
        }
    }


    async createCart() {
        try {
            const newCart = await this.model.create({products: [], cartId: new mongoose.Types.ObjectId()})
            return newCart;
        } catch (error) {
            console.error('Error al crear el carrito')
            throw error;
        }
    } 
}


module.exports = CartManagerMongo