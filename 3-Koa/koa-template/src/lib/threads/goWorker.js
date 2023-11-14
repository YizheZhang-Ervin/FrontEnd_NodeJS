const workerpool = require('workerpool');

let func1 = (params) => {
    console.log(params)
}

workerpool.worker({
    func1: func1,
});