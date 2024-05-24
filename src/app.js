const express = require('express')
const handlebars = require('express-handlebars')
const productsRouter = require('../src/routers/api/product.router.js');
const cartsRouter = require('../src/routers/api/carts.router.js');
const index = require('../src/config/index.js')
const viewsRouter = require('./routers/views.routes.js')

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json())
app.use(express.urlencoded({extenden: true}))
app.use(express.static(__dirname+'/public'))

app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}))

app.set('views', __dirname+'/views')
app.set('view engine', 'hbs')

app.use('/', viewsRouter)

connectDB()


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);




app.listen(PORT, err => {
  if (err) console.log('Error', err)
  console.log(`Servidor corriendose en puerto ${PORT}`);
});
