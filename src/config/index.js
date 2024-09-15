const { connect } = require('mongoose')
const dotenv = require('dotenv');
const {MongoSingleton} = require ('../config/mongoSingleton.js');
const { commander } = require('../utils/commander.js');

const {mode} = commander.opts();

dotenv.config({
    path: mode === 'development' ? './.env.development' : './.env.production'
});

const connectDB = ()=> MongoSingleton.getInstance(process.env.MONGO_URL)

const objConf = {
    port: process.env.PORT || 8080,
    mongo_url: process.env.MONGO_URL,
    jwt_private_key: process.env.PRIVATE_KEY,
    gmail_pass: process.env.GMAIL_PASS,
    gmail_user: process.env.GMAIL_USER
}

//const connectDB = async () => {
//    try {
//        await connect(process.env.MONGO_URL, {
//            //useNewUrlParser: true,
//            //useUnifiedTopology: true
//        });
//        console.log('DB connected');
//    } catch (error) {
//        console.error('Error de conexion a la BD:', error);
//        process.exit(1);
//    }

//};

module.exports = {
    connectDB, objConf
}