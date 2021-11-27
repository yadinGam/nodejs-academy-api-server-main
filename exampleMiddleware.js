module.exports = (req, res, next) => {
    const { method, url } = req
    console.log(`***************** yadin created this middleware ******************`)
    next()
  }