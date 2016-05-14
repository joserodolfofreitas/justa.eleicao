var mysql = require('mysql');
var appConfig = require('../config/app-config');

var createDBManager = function(config) {
    var devConfig = {
        connectionLimit : 500,
        acquireTimeout: 5000,
        host     : appConfig.environment.dbHost,
        port     : appConfig.environment.dbPort,
        user     : appConfig.environment.dbUser,
        password : appConfig.environment.dbPassword,
        database : appConfig.environment.dbdatabase,
        multipleStatements: true
    };

    this.config = (config) ? config : devConfig;
    this.pool = mysql.createPool(this.config);

    this.getNewStandaloneConnection = function () {
       return mysql.createConnection(dbManager.config);
    }

    return this;
};

var dbManager = createDBManager();

exports.loadConfig = function (config) {
    dbManager = createDBManager(config);
}

exports.getConnectionPool = function() {
    return dbManager.pool;
}

exports.getStandaloneConnection = function() {
    return dbManager.getNewStandaloneConnection();
}

exports.killLockedProcesses = function() {
    dbManager.pool.getConnection(function(err, connection){
        if (err) { throw err; }

        var selectProcessesToKill = 'select concat(\'KILL \',id,\';\') from information_schema.processlist where user=?';
        connection.query(selectProcessesToKill, appConfig.environment.dbUser, function(err, processes){
            processes.map(function(process){
                connection.query(process, function(err, result){
                    if(err) { throw err; }
                });
            });
        });
    });


}