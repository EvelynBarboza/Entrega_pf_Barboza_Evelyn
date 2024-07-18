const passport = require('passport');
const { Router } = require('express');
const { UserManagerMongo } = require('../../dao/userDaoMongo.js')
const { auth } = require('../../middlewares/auth.middleware.js')
const { createHash, isValidPassword } = require ('../../utils/bcrypt.js');
const { generateToken } = require('../../utils/jwt.js');
const { passportCall } = require('../../middlewares/passportCall.middleware.js');
const { authenticate} = require ('../../middlewares/authorization.middleware.js')

const sessionRouter = Router();

const userService = new UserManagerMongo();

sessionRouter.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
            if (!email || !password) return res.status(401).send({status: 'error', error: 'Se deben completar todos los sampos'})
    //ver si existe el usuario 
        const userExist = await userService.getUserBy({email})
            if(userExist) return res.status(401).send({status: 'error', error: 'El usuario con ese email ya existe'})
    //CREAR EL CARRITO LLAMANDO METODO CREATECARS
        const newUser = {
        first_name,
        last_name,
        email,
        password: createHash(password),
        cid: null
    }

    const result = await userService.createUser(newUser)

    const token = await generateToken({
        first_name,
        last_name,
        email,
        id: result._id
    })

    res.cookie('token', token, {
        maxAge: 60 *60 *1000 *24,
        httpOnly: true
    }).send({status: 'success', message: 'Usuario registrado'})

    } catch (error) {
        console.error('error')
    }
})

sessionRouter.post( '/login', async (req, res) =>{
    try {
        const { email, password } = req.body
            if (!email || !password) return res.status(401).send({status: 'error', error: 'Se deben completar todos los campos'})
        const userFound = await userService.getUserBy({email})
            if (!isValidPassword({password: userFound.password}, password))return res.status(401).send({status: 'error', error: 'Password incorrecto'})
           // if(!userFound) return res.status(400).send({status: 'error', error: 'Usuario no encontrado'})
        
            const token = generateToken({
            email,
            first_name,
            last_name,
            id: userFound._id,
            role: userFound.role
        })

        res.cookie('token', token, {
            maxAge: 60*60*1000*24,
            httpOnly: true
        }).send({status: 'success', message: 'usuario logueado'})
        
        console.log(req.session.user)
        res.send('login success')
    } catch (error) {
        console.error('error')
    }
})

sessionRouter.get('/current', passportCall('jwt'), authenticate(['user_premium', 'user']), async (req, res) =>{
    res.send('Datos sensibles que solo puede ver el admin')
})

//ver esta ruta
sessionRouter.get('/session', async (req, res) =>{
    try {
        if (req.session.counter) {
            req.session.counter++
            res.send(`Se ah visitado el sitio ${req.session.counter} veces.`)
            }else {
            req.session.counter = 1
            res.send('Biendvenides')
            }
    } catch (error) {
        console.error(error)
    }
})

sessionRouter.get('/logout', async (req, res) => {
    req.session.destroy(err =>{
        if (err) return res.send({ status: 'error', error: err})
            else return res.render('login')
    })
})

//AUTENTICACION CON GITHUB
sessionRouter.get('/github', passport.authenticate('github', {scope: 'user:email'}), async (req, res) =>{

})

sessionRouter.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), (req, res)=>{
    req.session.user = req.user 
    res.redirect('/products')
})

///////////////    LOGIN Y REGISTER CON PASSPORT    //////////////
//REGISTER
//sessionRouter.post('/register', passport.authenticate('register', {failureRedirect: '/failregister'}), async (req, res) =>{
//    res.send({status: 'succes', message:'Usuario registrado'})
//})
//sessionRouter.post('/failregister', async (req, res) =>{
//    console.log('Fallo la operacion')
//    res.send({error: 'failed'})
//})
////LOGIN
//sessionRouter.post('/login', passport.authenticate('login', {failureRedirect: '/faillogin'}), async (req, res) =>{
//    if(!req.user) return res.status(400).send({status: 'error', error: 'credenciales invalidas'})
//        req.session.user = {
//            first_name: req.user.first_name,
//            last_name: req.user.last_name,
//            email: req.user.email
//        }
//    res.send({status: 'succes', message:'Usuario logueado', payload: req.user})
//})
//sessionRouter.post('/faillogin', async (req, res) =>{
//    res.send({error: 'fallo el login'})
//})

module.exports= { sessionRouter }