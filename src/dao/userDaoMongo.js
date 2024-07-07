const { userModel } = require ('../models/user.models.js')
const mongoosePaginate = require('mongoose-paginate-v2');

userModel.plugin(mongoosePaginate);

class UserManagerMongo {
    constructor () {
        this.userModel = userModel;
    }
//TRAER TODOS LOS USUARIOS
    async getUsers({limit = 10, numPage= 1}) {
        const users = await this.userModel.paginate({}, {limit, page: numPage, sort: {price: -1}, lean: true })
        return users;
    }

//CREARE UN NUEVO USUARIO
    async createUser(newUser) {
        return await this.userModel.create(newUser)
    }

//TRAER UN USUARIO POR ALGUN FILTRO ESPECIFICO
    async getUserBy(filter) {
        return this.userModel.findOne(filter);
    }

//TRAER UN USUARIO POR EMAIL
    async getUserByEmail(email) {
        return this.userModel.findOne({email});
    }

//ACTUALIZAR UN USUARIO 
async updateUser(id, updateData) {
    return this.userModel.updateOne({_id: id}, updateData);
    }

//ELIMINAR UN USUARIO
async deleteUser(id) {
    return this.userModel.deleteOne({_id: id})
    }
}

module.exports = {UserManagerMongo}