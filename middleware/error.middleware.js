module.exports = fn => (req, res, next) => {
    fn(req, res, next).catch((err) => {
        console.log(err);
        res.status(500).json({
            msg: err?.message || 'Something wen wrong'
        });
    });
}