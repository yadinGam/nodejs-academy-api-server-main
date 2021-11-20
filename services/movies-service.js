const INITIAL_MOVIES = require('./movies.json')

let allMovies = []
let currentIndex = 0

function getAllMovies() {
  return [...allMovies]
}

function getById(id) {
  return getAllMovies().find((movie) => movie.id === id)
}

function getMovieIndexById(id) {
  return getAllMovies().findIndex((movie) => movie.id === id)
}

function getMovieIndexByTitle(title) {
  return getAllMovies().findIndex((movie) => movie.title === title)
}

function getMovieByTitle(title) {
  return getAllMovies().find((movie) => movie.title === title)
}

function createMovie({ title, img, synopsis, rating, year }) {
  const newMovie = {
    id: getNextIndex(),
    title,
    img,
    synopsis,
    rating,
    year,
  }

  allMovies = [...allMovies, newMovie]

  return newMovie
}

function upsertMovie({ title, img, synopsis, rating, year }) {
  //search the movie according to title
  const index = getMovieIndexByTitle(title)
  const searchedMovie = getMovieByTitle(title)

  if(index != -1 && searchedMovie) {
    const newMovie = {
      id: searchedMovie.id,
      title,
      img,
      synopsis,
      rating,
      year,
    }
 
    allMovies.splice(index,1,newMovie)

    const movieObject = {
      movie: newMovie,
      code: 200
    }
    
    return movieObject

  } else {
    const movieObject = {
      movie: createMovie({ title, img, synopsis, rating, year }),
      code: 201
    }
    
    return movieObject
  }
}

function modifyMovie(id, {title, img, synopsis, rating, year }) {
debugger
  let movie = getById(id)
  const index = getMovieIndexById(id)

  //QUESTION: is there an easy way to write this without checking each parameter with an if?
  if(movie && index != -1) {
    
    if(title) {
      movie.title = title
    }

    if(img) {
      movie.img = img
    }

    if(synopsis) {
      movie.synopsis = synopsis
    }

    if(rating) {
      movie.rating = rating
    } 

    if(year) {
      movie.year = year
    } 

    debugger
    allMovies.splice(index,1,movie)
    return movie

  }

  return movie

}

function deleteMovie(id) {
  let movie = getById(id)
  const index = getMovieIndexById(id)

  if(movie && index != -1) {
    allMovies.splice(index, 1)
  }

  return movie

}

function init() {
  allMovies = [...INITIAL_MOVIES.movies]
  currentIndex = allMovies[allMovies.length - 1].id
}

function getNextIndex() {
  return ++currentIndex
}

init()

module.exports = {getAllMovies, getById, createMovie, init, upsertMovie, modifyMovie, deleteMovie}


