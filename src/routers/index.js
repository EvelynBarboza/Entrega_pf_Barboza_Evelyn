const { Router } = require('express');
const viewsRouter = require('../routers/views.routes.js');
const userRouter = require('../routers/api/users.routes.js');
const productsRouter = require('../routers/api/product.router.js');
//const pruebaCookie = require('../routers/api/cookies.router.js');
const {sessionRouter} = require('../routers/api/sessions.router.js');
const cartsRouter = require('../routers/api/carts.router.js');

const router = Router();

//const sessionRouterClass = new sessionRouter
router.use('/', viewsRouter);
router.use('/api/users', userRouter);
router.use('/api/products', productsRouter);
//router.use('/cookie', pruebaCookie);
router.use('/api/carts', cartsRouter);
//localhost:8080/api/sessions/githubcallback
router.use('/api/sessions', sessionRouter);

module.exports = router;