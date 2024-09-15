const express = require('express')
const handlebars = require('express-handlebars')
const routerApp = require('../src/routers/index.js')
const { connectDB, objConf } = require('../src/config/index.js');
const cookieParser = require ('cookie-parser');
const passport = require('passport');
const { initializePassport } = require('../src/config/passport.config.js');
const dotenv = require ('dotenv')
//const index = require('./config/index.js')
const viewsRouter = require('./routers/views.routes.js')
//const session = require('express-session')
//const MongoStore = require ('connect-mongo')
//const UserManagerMongo = require('../src/dao/userManagerMongo.js');
const swaggerJsDocs = require('swagger-jsdoc');
const swaggerUiExpress = require('swagger-ui-express');
const { addLogger } = require('./middlewares/addLogger.js');
const { swaggerOptions } = require('./config/swagger.config.js');
const logger = require('./utils/logger.js')

const app = express();
dotenv.config()

const { port } = objConf;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public')); 

app.use(cookieParser());
app.use(addLogger);

app.use(passport.initialize());
initializePassport();

const specs = swaggerJsDocs(swaggerOptions)
app.get('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

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
  if (err) logger.info('Error', err)
  logger.info('Servidor corriendose en el puerto' + port);
});
