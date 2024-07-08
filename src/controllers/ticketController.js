const Ticket = require ('../models/ticket.models.js')
const User = require('../models/user.models.js');

exports.createTicket = async (req, res) => {
    try {
        const { amount } = req.body;
        const newTicket = new Ticket({
            amount: amount, 
            purchaser: req.user._id
        });
        const savedTicket = await newTicket.save();
        res.status(201).json(savedTicket);

    } catch (error) {
        res.status(500).json({error: error.message});

    }
};

