// 持久存在，页面关闭后也可使用
// 存储量大、安全、快捷
// 适用存储文本类型的信息数据、用户个性化设置数据

const Storage =  {}

// 取值
Storage.get = function (name) {
    return JSON.parse(localStorage.getItem(name))
}

// 设值
Storage.set = function (name, val) {
    localStorage.setItem(name, JSON.stringify(val))
}

// 加值
Storage.add = function (name, addVal) {
    let oldVal = Storage.get(name)
    let newVal = oldVal.concat(addVal)
    Storage.set(name, newVal)
}

export default Storage