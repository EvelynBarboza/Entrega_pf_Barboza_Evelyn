const {UserManagerMongo} = require('../dao/userDaoMongo.js');

const userService = new UserManagerMongo();

class UserController {
    constructor(){
        this.userService = userService;
    }

//TRAER TODOS LOS USUARIOS
getUsers = async (req, res) => {
    const {limit, numPage} = req.query;
    try {
        const users = await this.userService.getUsers({limit, numPage})
        res.send({status: 'success', payload: users})
    } catch (error) {
        res.status(500).send({status: 'error', error: error.message});
    }
};

//TRAER UN USUARIO POR ID
getUser = async (req, res) => {
    const {uid} = req.params;
    try {
        const user = await this.userService.getUserBy({_id: uid})
        if (user) {
            res.send({status:'success', payload: user});
        } else {
            res.status(404).send({status: 'error', error: 'Usuario no encontrado'})
        }
    } catch (error) {
        res.status(500).send({status: 'erorr', error: error.message});
    }
};

//CREAR UN USUARIO
createUser = async (req, res) => {
    const { first_name, last_name, email} = req.body;
    if (!first_name || !last_name || !email) {
        return res.status(400).send({ status: 'error', error: 'Faltan campos obligatorios'});
    }
    const newUser = {first_name, last_name, email};
    try {
        const result = await this.userService.createUser(newUser);
        res.send({status: 'success', payload: result})
    } catch (error) {
        res.status(500).send({status: 'error', error: error.message});
    }
};

//ACTUALIZAR UN USUARIO
updateUser = async (req, res) => {
    const { uid } = req.params;
    const { first_name, last_name, email} = req.body;
    
    if (!first_name || !last_name || !email) {
        return res.status(400).send({ status: 'error', error: 'Faltan campos obligatorios'});
    }
    try {
        const result = await this.userService.updateUser(uid, {first_name, last_name, email});
        res.send({ status: 'success', payload: result});
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message});
    }
};

//ELIMINAR UN USUARIO
deleteUser = async (req, res) => {
    const { uid } = req.params;
    try {
        const result = await this.userService.deleteUser(uid);
        res.send({ status: 'success', payload: result});
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message})
    }
};
}

module.exports = UserController;