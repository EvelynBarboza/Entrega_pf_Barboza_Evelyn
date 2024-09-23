const passport = require('passport');
const { Router } = require('express');
const { auth } = require('../../middlewares/auth.middleware.js')
const { createHash, isValidPassword } = require ('../../utils/bcrypt.js');
const { generateToken } = require('../../utils/jwt.js');
const { passportCall } = require('../../middlewares/passportCall.middleware.js');
const { authenticate} = require ('../../middlewares/authorization.middleware.js')
const UserController = require('../../controllers/user.controllers.js');

const sessionRouter = Router();
const userController = new UserController

sessionRouter.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
            if (!email || !password) return res.status(401).send({status: 'error', error: 'Se deben completar todos los sampos'})
    
    //ver si existe el usuario 
        const userExist = await userController.service.getItem({email})
            if(userExist) return res.status(401).send({status: 'error', error: 'El usuario con ese email ya existe'})
    
    //CREAR EL usuario L
        const newUser = {
        first_name,
        last_name,
        email,
        password: createHash(password),
        cid: null
    }

    const result = await userController.service.createItem(newUser)

    const token = generateToken({
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
        console.error('Error en /register:', error)
        res.status(500).send({status: 'error', error: 'Error en el servidor'});
    }
});

sessionRouter.post( '/login', async (req, res) =>{
    try {
        const { email, password } = req.body
            if (!email || !password) return res.status(401).send({status: 'error', error: 'Se deben completar todos los campos'})
        
        const userFound = await userController.service.getItem({email});
            if(!userFound) return res.status(400).send({status: 'error', error: 'Usuario no encontrado'})
            if (!isValidPassword(userFound, password))return res.status(401).send({status: 'error', error: 'Password incorrecto'});

        const token = generateToken({
            email,
            first_name: userFound.first_name,
            last_name: userFound.last_name,
            id: userFound._id,
            role: userFound.role
        });

        res.cookie('token', token, {
            maxAge: 60*60*1000*24,
            httpOnly: true
        }).send({status: 'success', message: 'usuario logueado'});
        
    
    } catch (error) {
        console.error('Error en /login:', error);
        res.status(500).send({status: 'error', error: 'Error en el servidor'})
    }
});

sessionRouter.get('/current', passportCall('jwt'), authenticate(['user_premium', 'user']), async (req, res) =>{
    res.send('Datos sensibles que solo puede ver el admin')
})


sessionRouter.get('/session', async (req, res) =>{
    try {
        if (req.session.counter) {
            req.session.counter++;
            res.send(`Se ah visitado el sitio ${req.session.counter} veces.`)
            }else {
            req.session.counter = 1
            res.send('Biendvenida')
            }
    } catch (error) {
        console.error('Error en /session:', error);
        res.status(500).send({status: 'error', error: 'Error en el servidor'});     
    }
})

sessionRouter.get('/logout', async (req, res) => {
    req.session.destroy(err =>{
        if (err) return res.send({ status: 'error', error: err})
            return res.render('login')
    })
})

//AUTENTICACION CON GITHUB
sessionRouter.get('/github', passport.authenticate('github', {scope: 'user:email'}), async (req, res) =>{

})

sessionRouter.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), (req, res)=>{
    req.session.user = req.user 
    res.redirect('/products')
})

module.exports= { sessionRouter }