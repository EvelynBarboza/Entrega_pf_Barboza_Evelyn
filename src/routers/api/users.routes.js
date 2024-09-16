const { Router } = require('express'); 
const  {passportCall}  = require ('../../middlewares/passportCall.middleware.js')
const { authenticate } = require ('../../middlewares/authorization.middleware.js')
const UserController = require('../../controllers/user.controllers.js');

const router = Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = new UserController();

//TARER TODOS LOS USUARIOS
router.get('/', passportCall('jwt'), authenticate(['admin']), getUsers)
//passport.authenticate('jwt', { session: false }),

// TRAER UN USUARIO POR ID
router.get('/:uid', passportCall('jwt'), authenticate(['admin', 'user']), getUser)

// CREAR UN USUARIO
router.post('/', createUser)

//ACTUALIZAR UN USUARIO
router.put('/:uid', passportCall('jwt'), authenticate(['admin', 'user']), updateUser)

//ELIMINAR UN USUARIO
router.delete('/:uid', passportCall('jwt'), authenticate(['admin']), deleteUser)

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
