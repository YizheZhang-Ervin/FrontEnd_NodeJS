// 存储管理复杂结构的数据
// 可用indexedDB替代

// 打开数据库
this.db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);

this.db.transaction(function (tx) {
    // 创表
    tx.executeSql('CREATE TABLE IF NOT EXISTS STUDENT (id unique, name, sex, age)');
    // 加数据
    tx.executeSql('INSERT INTO STUDENT (id, name, sex, age) VALUES (?, ?, ?, ?)', [111, 'A', '男', 20]);
    tx.executeSql('INSERT INTO STUDENT (id, name, sex, age) VALUES (?, ?, ?, ?)', [222, 'B', '女', 18]);

});

//查询student表
get_data = function () {
    var arry = new Array()
    this.db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM STUDENT', [], function (tx, results) {
            var len = results.rows.length, i;
            for (i = 0; i < len; i++) {//把查出来的数据封装到一个对象里面 最后放到数组里面
                let name = results.rows.item(i).name
                let sex = results.rows.item(i).sex
                let age = results.rows.item(i).age
                let id = results.rows.item(i).id
                var o = new Object()//创建一个js对象
                o.name = name
                o.age = age
                o.id = id
                o.sex = sex
                arry.push(o)
            }
        }, null);
    });//将数组赋值给vue创建的数组
    this.values = arry
}

//删除student中的某条数据
remove_data = function (index, row) {
    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        this.db.transaction(function (tx) {                   //id参数
            tx.executeSql('DELETE FROM STUDENT WHERE id = ?', [row.id]);
        })
        this.get_data()
        this.$message({
            type: 'success',
            message: '删除成功!'
        });
    }).catch(() => {
        this.$message({
            type: 'info',
            message: '已取消删除'
        });
    });
}

// 更新表
update_date = function () {
    let name = this.upstu.name
    let sex = this.upstu.sex
    let age = this.upstu.age
    let id = this.upstu.id
    this.db.transaction(function (tx) {
        tx.executeSql('UPDATE STUDENT SET name = ?,sex = ?,age=? WHERE id=?', [name, sex, age, id]);
    })//动态获取数据
    this.get_data()
    this.editDialogVisible = false
}