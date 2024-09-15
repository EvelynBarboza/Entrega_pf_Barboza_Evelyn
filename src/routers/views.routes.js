const { Router } = require ('express');
const paginate = require('mongoose-paginate-v2');
const productController = require('../controllers/products.controllers.js');
const UserManagerMongo = require('../dao/mongo/userDaoMongo.js')
const auth = require ('../middlewares/auth.middleware.js');

const router = Router()


router.get('/', (req, res) => {
    res.render('index')
  })

  router.get('/login', (req, res) => {
    res.render('login')
  })

  router.get('/register', (req, res) => {
    res.render('register')
  })

  router.get('/products', (req, res) => {
    res.render('products')
  })
  router.get('/users', auth, async (req, res) =>{
    const { numPage, limit } = req.query;

    const userService = new UserManagerMongo();
    const { docs, page, hasPrevPage, hasNextPage, prevPage, nextPage } = await userService.getUsers({limit, numPage})

    res.render('users', {
        users: docs,
        page,
        hasNextPage,
        hasPrevPage,
        nextPage,
        prevPage
    })
})

router.get('/perfil', (req, res)=>{
    res.render('main')
})

 //router.post('/upload-file', uploader.single('myfile'),(req, res) =>{
 //  res.render('succesfile')
 //})

module.exports = router;