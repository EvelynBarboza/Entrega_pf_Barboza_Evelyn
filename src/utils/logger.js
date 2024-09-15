const winston = require('winston');

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4
    },
    colors: {
        fatal: 'red',
        error: 'orange',
        warning: 'yellow',
        info: 'green',
        debug: 'blue'
    }
}

const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelOptions.colors}),
                winston.format.simple()
            )
        }), 
        //EN EL ARCHIVO QUE ME GENERA
        new winston.transports.File({
            filename: './errors.log',
            level: 'warning',
            format: winston.format.simple()
        })
    ]   
})

module.exports = logger;