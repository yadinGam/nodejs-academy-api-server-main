module.exports = (req, res, next) => {
  const { method, url } = req
  console.log(` 🚂  API Server: ${method} ${req.get('host')} ${url} ${new Date()}`)
  next()
}
//HW2 - this is an example of a middleware