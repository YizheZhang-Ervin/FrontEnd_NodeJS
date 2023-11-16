const fs = require('fs');
const goCache = require("./goCache.js")

// 读取配置
let readConfig = (pathToFile) => {
    if (pathToFile === undefined || pathToFile === null) {
        return null
    }

    // fileName：如 xx.json
    const configObj = readFile(pathToFile)

    // json则解析
    if (pathToFile.toLowerCase().endsWith(".json")) {
        let jsonObj = JSON.parse(configObj)
        goCache.set("config", jsonObj)
        return jsonObj
    } else {
        return configObj
    }
}

let readFile = (pathToFile) => {
    let configObj = null
    try {
        configObj = fs.readFileSync(pathToFile, 'UTF-8')
    } catch (e) {
        console.log("Read File Failed: ", e)
    }
    return configObj
}

let writeFile = (pathToFile, data) => {
    try {
        fs.writeFileSync(pathToFile, data);
    } catch (e) {
        console.log("Write File Failed: ", e);
    }
}

module.exports = {
    readConfig,
    readFile,
    writeFile
}