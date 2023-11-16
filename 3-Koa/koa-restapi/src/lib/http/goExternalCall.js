let request = require('request');

const doGet = (url) => {
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if (!error) {
                resolve(response, body)
            } else {
                reject(response, body)
            }
        })
    })
}

const doPost = (url, reqData) => {
    let options = {
        url: url,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(reqData)
    }
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (!error) {
                resolve(response, body)
            } else {
                reject(response, body)
            }
        })
    })
}

module.exports = {
    doGet, doPost
}