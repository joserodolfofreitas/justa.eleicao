var environment = require('./environment');

exports.environment = function() {
    switch (process.env.NODE_ENV) {
        case 'development':
            return environment.development;
        case 'devtest':
            return environment.devtest;
        case 'production':
            return environment.production;
        case 'staging':
            return environment.staging;
        case 'stagingtest':
            return environment.stagingtest;
        default:
            return environment.staging;
    }
}();