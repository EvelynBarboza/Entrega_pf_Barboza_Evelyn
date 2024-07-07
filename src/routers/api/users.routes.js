const { Router } = require('express'); 
const passport = require('passport');
const UserController = require('../../controllers/user.controllers.js');

//import { uploader } from '../utils.js';

const router = Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = new UserController();

//TARER TODOS LOS USUARIOS
router.get('/', passport.authenticate('jwt', { session: false }), getUsers)

// TRAER UN USUARIO POR ID
router.get('/:uid', passport.authenticate('jwt', { session: false }), getUser)

// CREAR UN USUARIO
router.post('/', passport.authenticate('jwt', { session: false }), createUser)

//ACTUALIZAR UN USUARIO
router.put('/:uid', passport.authenticate('jwt', { session: false }), updateUser)

//ELIMINAR UN USUARIO
router.delete('/:uid', passport.authenticate('jwt', { session: false }), deleteUser)

module.exports = router;

//para subir un archivo se guarda en req.file
//router.post('/',uploader.single('file'), (req,res)=>{
   // if (!req.file){
   //     return res.statuus(400).send({status:"error", error: "No se puede guardar la imagen"})
   // }
   // console.log(req.file);
   // let user = req.body;
  //  user.profile = req.file.path;
  //  users.push(user);
  //  res.send({status:"Success", message:"User created"})
//})

// uploader.array para subir muchos archivos se guarda en req.files
