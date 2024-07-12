const ticketModel = require('../models/ticket.models');

class TicketManagerMongo {
    constructor (){
        this.model = ticketModel
    }

//CREAR UN NUEVO TICKET
async createTicket(ticketData) {
    try {
        const newTicket = await this.model.create(ticketData);
        return newTicket;
    } catch(err) {
        console.error('Error al crear el ticket', err);
        throw err;
    }
}

//TRAER UN TICKET POR ID
async getTicketById(ticketId) {
    try {
        const ticket = await this.model.findById(ticketId);
        return ticket;
    }catch(err) {
        console.error('Error al obtener el ticket', err);
        throw err;
    }
}
//OBTEENER TODOS LOS TICVCKETS
async getTickets () {
    try {
        const tickets = await this.model.findByIdUpdate(ticketId, updateData, { new: true });
        return tickets
    } catch (error) {
        console.error('Error sl obtener los tickets', err);
        throw err;
    }
}

//ACTUALIZAR UN TICKET POR ID
async updateTicket(ticketId, updateData) {
    try {
        const updateTicket = await this.model.findByIdUpdate(ticketId, updateData, { new: true });
        return updateTicket
    } catch (error) {
        console.error('Error al actualizar el ticket', err);
        throw err;
    }
}

//ELIMINAR UN TICKET
async deleteTicket(ticketId) {
    try {
        const deleteTicket = await this.model.findByAndDelete(ticketId);
        return deleteTicket;
    } catch (error) {
        console.error( 'Error al eliminar el ticket', error);
        throw error;
    }
}
}

module.exports = TicketManagerMongo;