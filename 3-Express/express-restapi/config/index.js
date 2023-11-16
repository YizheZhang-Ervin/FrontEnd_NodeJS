module.exports = {
    // method 1: with name + password
    // var uri = "mongodb://username:password@hostname:port/dbname";
    // method 2: no name + password
    // var uri='mongodb://localhost/dbname'
    mongodb: "mongodb://root:root001@192.168.137.10:27017/TodoList",
    mysql: {
        host: '192.168.137.10',
        user: 'root',
        password: 'root001',
        database: 'TodoList',
        port: 3306
    }
};