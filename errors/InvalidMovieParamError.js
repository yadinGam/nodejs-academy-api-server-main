
function InvalidMovieParamError(message) {
    var error = new Error(message)
    error.isOperationl = true
    error.statusCode = 400
    return error
  }
  
  module.exports = InvalidMovieParamError
  