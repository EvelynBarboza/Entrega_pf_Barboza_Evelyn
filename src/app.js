const express = require('express')
const handlebars = require('express-handlebars')
const routerApp = require('../src/routes/index.js')
const { connectDB, objConf } = require('../src/config/index.js');
const cookieParser = require ('cookie-parser');
const passport = require('passport');
const { initializePassport } = require('../src/config/passport.config.js');
const dotenv = require ('dotenv')
const index = require('./config/index.js')
const viewsRouter = require('./routers/views.routes.js')

//const session = require('express-session')
//const MongoStore = require ('connect-mongo')
//const UserManagerMongo = require('../src/dao/userManagerMongo.js');


const app = express();
dotenv.config()

const { port } = objConf;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));

app.use(cookieParser());
app.use(passport.initialize());
initializePassport();

app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}));

app.set('views', __dirname + '/views')
app.set('view engine', 'hbs')

//CONEXION A DB
connectDB();

//USO DE RUTAS
app.use('/', routerApp);


app.listen(port, err => {
  if (err) console.log('Error', err)
  console.log('Servidor corriendose en puerto' + port);
});
