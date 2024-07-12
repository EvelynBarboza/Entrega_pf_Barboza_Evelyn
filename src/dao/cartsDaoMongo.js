const mongoose = require('mongoose');
const { cartsModel } = require('../models/cart.models');

class CartManagerMongo {
    constructor() {
        this.model = cartsModel;
    }

//OBTENER TODOS LOS CARRITOS
    async getCarts() {
        try { 
            const carts = await this.model.find().populate('products.product');
            return carts;
        } catch (error) {
            console.error('Error al obtener carritos')
            throw error;
        }
    }

//CREAR UN NUEVO CARRITO
    async createCart() {
        try {
            const newCart = await this.model.create({products: [], cartId: new mongoose.Types.ObjectId()})
            return newCart;
        } catch (error) {
            console.error('Error al crear el carrito')
            throw error;
        }
    } 

//OBTENER UN CARRITO POR SU ID
    async getCartById(cartId) {
        try {
            const cart = await this.model.findById(cartId).populate('products.product');
            return cart;
        } catch (error) {
            console.error('Error al obtener el carrito');
            throw error;
        }
    }

//AGREGAR UN PRODUCTO AL CARRITO
    async addProductToCart (cartId, productId) {
        try {
            const cart = await this.model.findById(cartId);
            if (!cart) return null;

            const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
            if (productIndex !== -1) {
                cart.products.push({ product: productId, quantity: 1});
            }
            return await cart.save();
        } catch (error) {
            console.error('Error al agregar el producto al carrito')
            throw error;
        }
    }
//ELIMINAR UN PRODUCTO DEL CARRITO
    async removeProductFromCart(cartId, productId) {
        try {
            const cart = await this.model.findById(cartId);
            if (!cart) return null;

            cart.products = cart.products.filter(p => p.product.toString() !== productId);
            return await cart.save();
        }catch (error) {
            console.error('Error al eliminar el producto del carrito')
            throw error;
        }
    }

//ACTUALIZAR EL CARRITO C/ARRAY DE PRDUCTS
    async updateCart(cartId, products) {
        try {
            const cart = await this.model.findById(cartId);
            if(!cart) return null;

            cart.products = products;
            return await cart.save();
        } catch (error) {
            console.error('Error al actualizzar el carrito')
            throw error;
        }
    }

//ACTUALIZAR LA CANTIDAD DE UN PRODUCTO EN EL CARRITO
    async updateProductQuantity(cartId, productId, quantity) {
        try {
            const cart = await this.model.findById(cartId);
            if (!cart) return null;

            const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity = quantity;
                return await cart.save();
            }
            return null;

        } catch (error) {
            console.error('Error al actualizar la cantidad del producto en el carrito:', error);
            throw error;
        }
    }

//ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO
    async deleteCart (cartId) {
        try {
            const cart = await this.model.findById(cartId);
            if (!cart) return null;

            cart.products = [];
            return await cart.save();
        } catch (error) {
            console.error('Error al eliminar todos los products del carrito');
            throw error;
        }
    }
}


module.exports = CartManagerMongo