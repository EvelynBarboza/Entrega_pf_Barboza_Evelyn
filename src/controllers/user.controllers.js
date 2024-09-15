//const {UserManagerMongo} = require('../dao/mongo/userDaoMongo.js');
const { userService} = require ("../service");
const { sendEmail } = require("../utils/sendEmail");
//const userService = new UserManagerMongo();

class UserController {
    constructor(){
       // this.service = userService
        this.service = ''
        //this.userService = userService; no
    }

//TRAER TODOS LOS USUARIOS
getUsers = async (req, res) => {
    const {limit, numPage} = req.query;
    try {
        const users = await this.service.getItems({limit, numPage})
        res.send({status: 'success', payload: users})
    } catch (error) {
        res.status(500).send({status: 'error', error: error.message});
    }
};

//TRAER UN USUARIO POR ID
getUser = async (req, res) => {
    const {uid} = req.params;
    try {
        const user = await this.service.getItem({_id: uid})
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
        const result = await this.service.createItem(newUser);
        const html = `<h1>Bienvenido ${result.first_name} ${result.last_name}</h1>`
        res.send({status: 'success', payload: result})
        sendEmail({userMail: result.email, subject: `Se ah creado corresctamente el usuario ${result.email}`, html})
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
        const result = await this.service.updateItem(uid, {first_name, last_name, email});
        const html = `<h2>Actuslizacion de usuario de ${result.first_name}</h2>`
        res.send({ status: 'success', payload: result});
        sendEmail({userMail: result.email, subject: 'Su usuario se ah actualizado con exito', html})
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message});
    }
};

//ELIMINAR UN USUARIO
deleteUser = async (req, res) => {
    const { uid } = req.params;
    try {
        const result = await this.service.deleteItem(uid);
        res.send({ status: 'success', payload: result});
    } catch (error) {
        res.status(500).send({ status: 'error', error: error.message})
    }
};
}

module.exports = UserController;