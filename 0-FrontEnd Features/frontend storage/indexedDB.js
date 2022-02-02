// 存储任何类型数据，简单，支持索引
// 适合结构，关系复杂的数据存储

if ('indexedDB' in window) {
    // 如果数据库不存在则创建，如果存在但是version更大，会自动升级不会复制原来的版本
    var req = indexedDB.open("TestDB", 1);

    req.onupgradeneeded = function (e) {
        var db = req.result;
        // var store = db.createObjectStore("student", {autoIncrement: true}); 使用自增键
        // 创建student表
        var store = db.createObjectStore("student", { keyPath: 'id' });
        // 设置id为主键
        store.createIndex('student_id_unqiue', 'id', { unique: true });
    }

    req.onsuccess = function (event) {
        var students = [
            { id: 1, name: 'A', age: '11' },
            { id: 2, name: 'B', age: '12' },
            { id: 3, name: 'C', age: '13' }
        ];

        var db = event.target.result;
        // var transaction = db.transaction('student', 'readwrite');
        var transaction = db.transaction(['student'], 'readwrite');
        transaction.onsuccess = function (event) {
            console.log('[Transaction] Done!');
        };

        var studentsStore = transaction.objectStore('student');
        students.forEach(function (student) {
            var db_op_req = studentsStore.add(student);
            db_op_req.onsuccess = function () {
                console.log("Save Done");
            }
        });

        studentsStore.count().onsuccess = function (event) {
            console.log('Amount of Student', event.target.result);
        };

        // 获取id为1的学生
        studentsStore.get(1).onsuccess = function (event) {
            console.log('Student which id is 1', event.target.result);
        };

        // 更新id为1的学生
        students[0].name = 'AAA';
        studentsStore.put(students[0]).onsuccess = function (event) {
            console.log('Updated student name whose id is 1', event.target.result);
        };

        // 删除id为2的学生
        studentsStore.delete(2).onsuccess = function (event) {
            console.log('deleted student whose id is 2');
        };
    }

    req.onerror = function () {
        console.log("DB Error");
    }
} else {
    console.log('Browser not support IndexedDB');
}