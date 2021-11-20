const MoviesService = require('../services/movies-service')

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

function createMovie(request, response) {
  const { title, img, synopsis, rating, year } = request.body

  if (!title) {
    return response.status(400).json({ error: 'title is a required body param' })
  }

  if (!synopsis) {
    return response.status(400).json({ error: 'synopsis is a required body param' })
  }

  if (!rating) {
    return response.status(400).json({ error: 'rating is a required body param' })
  }

  if (!year) {
    return response.status(400).json({ error: 'year is a required body param' })
  }

  const newMovie = MoviesService.createMovie({ title, img, synopsis, rating, year })
  return response.status(201).json(newMovie)
}

function upsertMovie(request, response) {
  const { title, img, synopsis, rating, year } = request.body

  if(!title) {
    return response.status(400).json({ error: 'title is a required body param' })
  }

  if(!synopsis) {
    return response.status(400).json({ error: 'synopsis is a required body param' })
  }

  if(!rating) {
    return response.status(400).json({ error: 'rating is a required body param' })
  }

  if(!year) {
    return response.status(400).json({ error: 'year is a required body param' })
  }

  const responsObject = MoviesService.upsertMovie({ title, img, synopsis, rating, year })

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

  if (!!deletedMovie) {
    return response.status(200).json(deletedMovie)
  } else {
    return response.status(404).json({ error: `movie with id ${deletedMovie} was not found` })
  }
}

module.exports = { getMovies, getById, createMovie, upsertMovie, modifyMovie, deleteMovie }
