const Cart = require('../models/cart.models.js');
const Product = require('../models/products.models.js');
const Ticket = require('../models/ticket.models.js');
const CartManagerMongo = require('../dao/cartsDaoMongo.js');
const TicketManagerMongo = require('../dao/ticketsDaoMongo.js');

class CartController {
    constructor(){
        this.cartService = new CartManagerMongo();
        this.ticketService = new TicketManagerMongo();
    }

//CREAR ORDEN DE COMPRA
purchaseCart = async (req, res) => {
    try {
        const cartId= req.prams.cid;
        const cart = await this.cartService.getCartById(cartId);

        if (!cart){
            return res.status(404).json({ error: 'No se encuenytra el carrito'})
        }
        let totalAmount = 0;
        let purchasedProducts = [];
        let notPurchasedProducts = [];

        for(const item of cart.products) {
            const product = item.product;
            const quantity = item.quantity;

            if(product.stock >= quantity) {
                product.stock -= quantity;
                totalAmount += product.price * quantity;
                purchasedProducts.push(item);
                await product.save();
            } else {
                notPurchasedProducts.push(item);
            }
        }
        let newTicket = null;
        if (totalAmount > 0){
            newTicket = await this.ticketService.createTicket({
                amount: totalAmount,
                purchaser:req.user.email
            });
        }

        cart.products = notPurchasedProducts;
        await cart.save();

        res.status(200).json({
            message: 'Se genero la orden con exito :D',
            ticket: Ticket,
            notPurchasedProducts: notPurchasedProducts.map(item => item.product._id)
        });

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

//TRAER CARRITO DE COMPRA POR ID
getCartById = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await this.cartService.getCartById(cartId);

        if (!cart) {
            return res.status(404).json({error: 'No se encuentra el carrito'});
        }
        res.status(200).json(cart);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
}

//CREAR NUEVO CARRITO
createCart = async  (req, res) => {
    try {
        const newCart = await this.cartService.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
//ACTUALIZAR EL CARRITO
updateCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const updateCart = await this.cartService.updateCart(cartId, req.body);

        if(!updateCart) {
            return res.status(404).json({error: 'Nose encuentra el carrito'});
        }
        res.status(200).json(updateCart);

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

//ELIMINAR CARRITO POR ID
deleteCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const deleteCart = await this.cartService.deleteCart(cartId);

        if (!deleteCart) {
            return res.status(404).json({ error: 'No se encuentra el carrito'});

        }
        res.status(200).json({ message:'Carrito elimiadod'});
    } catch (error){
        res.status(500).json({error: error.message})
    }
}
}


module.exports = new CartController();