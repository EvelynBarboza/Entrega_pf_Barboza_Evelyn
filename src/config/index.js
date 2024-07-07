const { connect } = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const objConf = {
    port: process.env.PORT || 8080,
    mongo_url: process.env.MONGO_URL,
    jwt_private_key: process.env.PRIVATE_KEY
}

const connectDB = async () => {
    try {
        await connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB connected');
    } catch (error) {
        console.error('Error de conexion a la BD:', error);
        process.exit(1);
    }

};

module.exports = {
    connectDB, objConf
}