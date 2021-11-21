//this middleware set the header of X-Powered-By to unknown
//in order to hide the  X-Powered-By value that we received
const addResponseHeader = (req, res, next) => {

console.log(`value of X-Powered-By before change is: ${res.get('X-Powered-By')}`)
res.setHeader('X-Powered-By', 'unknown')

console.log(`value of X-Powered-By after change is: ${res.get('X-Powered-By')}`)

    next()
}

module.exports = { addResponseHeader }