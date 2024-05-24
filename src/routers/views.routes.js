const { Router } = require('express');


const router = Router()


router.get('/', (req, res) => {
    res.render('index')
  })

  router.get('/login', (req, res) => {
    res.render('index')
  })

  router.get('/register', (req, res) => {
    res.render('index')
  })

  router.get('/products', (req, res) => {
    res.render('index')
  })

  router.post('/upload-file', uploader.single('myfile'),(req, res) =>{
    res.render('succesfile')
  })

  module.exports = router