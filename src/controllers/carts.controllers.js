const Cart = require('../models/cart.models.js');
const Product = require('../models/products.models.js');
const Ticket = require('../models/ticket.models.js');

class CartController {
    constructor(){
        this.cartService = cartService
    }

//CREAR ORDEN DE COMPRA
purchaseCart = async (req, res) => {
    try {
        const cartId= req.prams.cid;
        const cart = await Cart.findById(cartId).populate('products.product');

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
                notPurchasedProducts.push(item)
            }
        }
        if (totalAmount > 0){
            const newTicket = new Ticket({
                amount: totalAmount,
                purchaser:req.user.email
            });
            await newTicket.save();
        }
        cart.products = notPurchasedProducts;
        await cart.save();

        res.status(200).json({
            message: 'Se genero la orden con exito :D',
            ticket: Ticket,
            notPurchasedProducts: notPurchasedProducts.map(item => item.product._id)
        });

    } catch (error) {
        res.status(5000).json({error:error.message})
    }
}



}
