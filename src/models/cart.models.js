const { Schema, model } = require('mongoose')

const CartSchema = new Schema({
    products: {
        type: [ {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: Number,
        } ]
    }
})

const cartModel = model('carts', CartSchema)