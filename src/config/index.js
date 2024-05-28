const { connect } = require('mongoose')


const connectDB = async () => {
    try {
        await connect('mongodb://127.0.0.1:27017/e-commerce_bck', {
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
    connectDB
}