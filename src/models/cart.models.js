const { Schema, model } = require('mongoose')

const CartSchema = new Schema({
    products: {
        type: [ {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }],
        default: []
    }
});

const cartModel = model('Cart', CartSchema);
module.exports = {cartsModel: cartModel};