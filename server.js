const express = require('express')
const serverLog = require('./serverLog')
const moviesRouter = require('./routers/movies-router')
const exampleMiddleware = require('./exampleMiddleware')// HW2 - add an import to you APPLICATION LEVEL MIDDLEWARE
const { addDate } = require('./middleware/addDate')// HW2 - add an import to you APPLICATION LEVEL MIDDLEWARE
const { addResponseHeader } = require('./middleware/addResponseHeader') // HW2 - add an import to you APPLICATION LEVEL MIDDLEWARE

const app = express()
const port = 8080


const myErrHandler = function (err, req, res, next) {
  console.log('SOME ERROR ACCRUED')
  console.error(err)
  res.status(500).send('Something broke!')
}

app.use(exampleMiddleware, serverLog, addDate, addResponseHeader)// HW2 - make the app use the APPLICATION LEVEL MIDDLEWARE that you created
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use('/movies', moviesRouter)



app.get('/', (req, res, next) => {
  res.status(200).json({
    server: '1.0.0',
    name: 'nodejs-api-server',
  })
})

app.get('/query', (req, res, next) => {
  console.log(req.query)
  const { test } = req.query
  // do what we need with the param
  res.status(200).json({
    queryParams: req.query,
  })
}).get('/query/test/:number', (req, res, next) => {
  console.log(req.params)
  const { test } = req.query
  // do what we need with the param
  res.status('200').json({
    params: req.params,
  })
}).post('/', (req, res, next) => {
  console.log(req.body)
  const { data } = req.body
  res.status(200).json({
    received: data,
  })
})

//this line of code is what tells the app to use the invalidMovieParamError - HW2
app.use( (err, req, res, next) => {
  debugger
  if (res && res.headersSent) {
    return next(err)
  }
  return res.status(err.statusCode).json({ error: err.message })
})

//the process is using it on uncaughtException - HW2
process.on('uncaughtException', error => {
  res.status(error.statusCode).json({ error: err.message })
  if(!error.isOperational)
    process.exit(1)
})

// // for Yoni and Idan 
// app.get('/test-error', function (req, res, next) {
//   // new Error(message, options, fileName, lineNumber)
//   throw new Error('New error message', {cause : "You shall not pass"})
// })
// 
// app.use(myErrHandler)

const server = app.listen(8080, () => console.log(`server started on port ${port}`))
module.exports = { app, server }
