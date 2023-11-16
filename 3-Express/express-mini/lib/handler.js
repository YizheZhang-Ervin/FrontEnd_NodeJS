exports.check = (req, res) => {
    res.status(200);
    res.json({
        result: JSON.stringify("200 OK")
    });
};