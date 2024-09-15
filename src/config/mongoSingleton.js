const {connect} = require('mongoose');
const logger = require('../utils/logger');


class MongoSingleton {
    static #instance
    constructor(mongo_url){
        connect(mongo_url)
    }
    static getInstance = (mongo_url) => {
        if(this.#instance){
            logger.info('Base de datos conectada')
            return this.#instance
        }
        this.#instance = new MongoSingleton (mongo_url)
        logger.info('Base de datos creada')
        return this.#instance
    }
}

module.exports = {
    MongoSingleton
}