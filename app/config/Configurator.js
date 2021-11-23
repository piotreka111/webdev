const dev_config = require('./config_files/dev_config');
const prod_config = require('./config_files/prod_config');
const global_config = require('./config_files/global_config');

const PRODUCTION = global_config.production;

const Configurator = function () {
    if(!PRODUCTION)
        return dev_config;
    else
        return prod_config;
};


module.exports = Configurator;
