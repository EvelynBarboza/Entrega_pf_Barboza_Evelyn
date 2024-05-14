const { Schema, model } = require('mongoose');

const productsCollection = 'products'

const productSchema = new Schema({
    title: {
        type: String,
        index: true,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true,
    },
    code: String,
    stock: Number
});

const productsModel = model(productsCollection, productSchema);

module.exports= {
    productsModel
} 