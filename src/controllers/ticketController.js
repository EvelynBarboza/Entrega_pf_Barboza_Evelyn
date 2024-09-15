const Ticket = require ('../models/ticket.models.js');
const User = require('../models/user.models.js');
const sendEmail= require('../utils/sendEmail.js')

exports.createTicket = async (req, res) => {
    try {
        const { amount } = req.body;
        const newTicket = new Ticket({
            amount: amount, 
            purchaser: req.user._id
        });
        const savedTicket = await newTicket.save();
        const html= `<h1>Se ah generado su eticket con ID: ${savedTicket._id}</h1>`;
        await sendEmail({
            userMail: req.user.email, 
            subject: 'Su eTicket se ah creado correctamente', 
            html: html
        })
        res.status(201).json(savedTicket);

    } catch (error) {
        res.status(500).json({error: error.message});

    }
};

