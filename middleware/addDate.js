
const addDate = (req, res, next) => {
    req.yadin = "this is yadin parameter"
    console.log(`${req.yadin }`)
    next()
}

module.exports = { addDate }