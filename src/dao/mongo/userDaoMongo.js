//const mongoose =require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
const { usersModel } = require ('../../models/user.models.js')


class UserDaoMongo {
    constructor () {
        this.usersModel = usersModel;
        //usersModel.plugin(mongoosePaginate);
    }
//TRAER TODOS LOS USUARIOS
    async getUsers({limit = 10, numPage= 1}) {
        const options = {
            limit,
            page: numPage,
            sort: {price: -1},
            lean: true
        };
        const users = await this.usersModel.paginate({}, options)
        return users;
    }

//CREARE UN NUEVO USUARIO
    async createUser(newUser) {
        return await this.usersModel.create(newUser)
    }

//TRAER UN USUARIO POR ALGUN FILTRO ESPECIFICO
    async getUserBy(filter) {
        return this.usersModel.findOne(filter);
    }

//TRAER UN USUARIO POR EMAIL
    async getUserByEmail(email) {
        return this.usersModel.findOne({email});
    }

//ACTUALIZAR UN USUARIO 
async updateUser(id, updateData) {
    return this.usersModel.updateOne({_id: id}, updateData);
    }

//ELIMINAR UN USUARIO
async deleteUser(id) {
    return this.userModel.deleteOne({_id: id})
    }
}

module.exports = { UserDaoMongo };