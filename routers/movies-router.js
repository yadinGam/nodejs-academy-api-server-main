const express = require('express')
const {
  getMovies,
  getById,
  createMovie,
  upsertMovie,
  modifyMovie,
  deleteMovie,
} = require('../controllers/movies-controller')

//the use of checkLegalID will work only for calls wich send
//an id so instead of moviesRouter.use(checkLegalID) we will add it to the specific calls
const { checkLegalID } = require('../middleware/checkLegalID')
const moviesRouter = express.Router()

moviesRouter.use(checkLegalID)// // HW2 - add an import to you ROUTE LEVEL MIDDLEWARE
moviesRouter.get('/', getMovies)
moviesRouter.get('/:id',checkLegalID, getById)
moviesRouter.post('/', createMovie)
moviesRouter.put('/', upsertMovie)
moviesRouter.patch('/:id',checkLegalID, modifyMovie)
moviesRouter.delete('/:id',checkLegalID, deleteMovie)

module.exports = moviesRouter
