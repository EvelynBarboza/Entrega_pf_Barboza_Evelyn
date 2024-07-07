const { Schema, model } = require('mongoose');
const { v4: uuidv4 } = require('uuid')

const ticketCollection = 'tickets'

const ticketSchema = new Schema ({
    ticketId: {
        type: String,
        default: uuidv4,
        unique: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
        default: function() {
            return uuidv4();
        }
    },
    purchase_datetime: {
        type: Date,
        default: Date.now
    },//(se hace con created_at)
    amount: {
        type: Number, 
        required: true
    }, //amount monto total de la compra
    purchaser:{
        type: String, 
        requires: true,
        validate: {
            validator: function() {
                return 
            },
            message: '', 
        }
    }
},
{
    timestamps: true 
    //habilita los campos createdAt y updateAt
})

module.exports = {
    ticketSchema, ticketCollection
}