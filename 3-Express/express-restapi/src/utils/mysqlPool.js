// 导入mysql
var mysql = require('mysql');
// 引入mysql连接配置
const config = require('../config/index');

// 使用连接池，提升性能
const pool = mysql.createPool(config.mysql);

// 使用
// let commonQuery = require('./utils/mysqlPool')
// let sql = "select * from xxTable";
// commonQuery.queryAll(sql,function(err,rows,fields){
//     console.log(rows);
// });
const commonQuery = {
    queryAll: function (sql, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null, null);
            } else {
                connection.query(sql, function (query_err, rows, fields) {
                    connection.release();
                    callback(query_err, rows, fields);
                })
            }
        })
    }
}
module.exports = commonQuery;