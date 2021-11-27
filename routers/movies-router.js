const express = require('express')
const {
  getMovies,
  getById,
  createMovie,
  upsertMovie,
  modifyMovie,
  deleteMovie,
  validate
} = require('../controllers/movies-controller')

//HW2 - the use of checkLegalID will work only for calls wich send
//an id so instead of moviesRouter.use(checkLegalID) we will add it to the specific calls
const { checkLegalID } = require('../middleware/checkLegalID')
const moviesRouter = express.Router()


moviesRouter.get('/', getMovies)
moviesRouter.get('/:id',checkLegalID, getById)// HW2 - add an import to you ROUTE LEVEL MIDDLEWARE
moviesRouter.post('/', validate('createMovie'), createMovie)
moviesRouter.put('/', upsertMovie)
moviesRouter.patch('/:id',checkLegalID, modifyMovie)// HW2 - add an import to you ROUTE LEVEL MIDDLEWARE
moviesRouter.delete('/:id',checkLegalID, deleteMovie)// HW2 - add an import to you ROUTE LEVEL MIDDLEWARE

module.exports = moviesRouter
