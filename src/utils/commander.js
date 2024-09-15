const {Command} = require('commander');

const commander = new Command()

commander
    .option('--node <mode>','Modo de ejecucion de mi server', 'production')
    .parse()

module.exports = {commander}