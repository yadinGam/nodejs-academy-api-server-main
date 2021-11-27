const MoviesService = require('../services/movies-service')
const InvalidMovieParamError = require('../errors/InvalidMovieParamError')
const { body, validationResult } = require('express-validator')

function getMovies(request, response) {
  let { offset, limit } = request.query
  const allMovies = MoviesService.getAllMovies()
  let relevantMovies = allMovies.slice()

  if (offset) {
    offset = parseInt(offset, 10)
    relevantMovies = relevantMovies.slice(offset)
  }

  if (limit) {
    limit = parseInt(limit, 10)
    relevantMovies = relevantMovies.slice(0, limit)
  }

  return response.status(200).json({ movies: relevantMovies, total: relevantMovies.length })
}

function getById(request, response) {
  const { id } = request.params
  const movieId = parseInt(id, 10)
  const movie = MoviesService.getById(movieId)

  if (!!movie) {
    return response.status(200).json(movie)
  } else {
    return response.status(404).json({ error: `movie with id ${movieId} was not found` })
  }
}

function createMovie(request, response, next) {
  const { title, img, synopsis, rating, year } = request.body

  const undefinedParams = {
    ...!(title && { title }),
    ...!(img && { img }),
    ...!(synopsis && { synopsis }),
    ...!(rating && { rating }),
    ...!(year && { year }),
  }
debugger
  if (!title) {
    return  next(InvalidMovieParamError('title is a required body param'))
  }

  if (!synopsis) {
    return next(InvalidMovieParamError('synopsis is a required body param' ))
  }

  if (!rating) {
    return next(InvalidMovieParamError('rating is a required body param' ))
  }

  if (!year) {
    return next(InvalidMovieParamError('year is a required body param'))
  }

  const newMovie = MoviesService.createMovie({ title, img, synopsis, rating, year })
  return response.status(201).json(newMovie)
}

function upsertMovie(request, response, next) {
  debugger
  const { title, img, synopsis, rating, year } = request.body

  if (!title) {
    debugger
    return  next(InvalidMovieParamError('title is a required body param'))
  }

  if (!synopsis) {
    debugger
    return next(InvalidMovieParamError('synopsis is a required body param'))
  }

  if (!rating) {
    debugger
    return next(InvalidMovieParamError('rating is a required body param'))
  }

  if (!year) {
    debugger
    return next(InvalidMovieParamError('year is a required body param'))
  }

  const responsObject = MoviesService.upsertMovie({ title, img, synopsis, rating, year })
debugger
  return response.status(responsObject.code).json(responsObject.movie)
}

function modifyMovie(request, response) {

  const { id } = request.params
  const movieId = parseInt(id, 10)

  const { title, img, synopsis, rating, year } = request.body
  
  const updatedMovie = MoviesService.modifyMovie(movieId, {title, img, synopsis, rating, year })

  if (!!updatedMovie) {
    return response.status(200).json(updatedMovie)
  } else {
    return response.status(404).json({ error: `movie with id ${updatedMovie} was not found` })
  }

}

function deleteMovie(request, response) {

  const { id } = request.params
  const movieId = parseInt(id, 10)

  const deletedMovie = MoviesService.deleteMovie(movieId)

  if (!deletedMovie) {
    return response.status(404).json({ error: `movie with id ${deletedMovie} was not found` })
  }
  return response.status(200).json(deletedMovie)
}

function validate(method) {
  console.log(`validating ${method} parameters`)
  switch(method) {
    case 'createMovie': {
      return [
        body('title', 'title doesn\'t exists').exists().isString().escape(),
        body('img', 'img is not exists or not valid url').exists().isURL(),
        body('synopsis', 'synopsis doesn\'t exists').exists().isString().escape(),
        body('rating', 'rating doesn\'t exists or not numeric').exists().isNumeric(),
        body('year', 'year doesn\'t exists or not numeric').exists().isNumeric(),
      ]
    }
  }
}

module.exports = { getMovies, getById, createMovie, upsertMovie, modifyMovie, deleteMovie, validate }
