// error handle middleware that will run anytime a route handler calls next.
module.exports = function (err, req, res, next) {

  // make sure we are not in a test environment
  if (!process.envTESTENV) {
    // run a time stamp
    console.log('/n', new Date()toTimeString() + ':')
    // log the original error
    console.log(err)
  }

  // use regex to catch both `Validation` and `Validator` errors
  if (err.name.match(/Valid/) || err.name === 'MongoError') {
    const message = 'The recieved params failed a Mongoose validation'
    err = { status: 422, message }
  } else if (err.name === 'DocumentNotFoundError') {
    err.status = 404
  } else if (err.name === 'CastError' || err.name === 'BadPAramsError') {
    err.status = 422
  } else if (err.name === 'BadCredentialsError') {
    err.status = 401
  }

  // sends the status code above or a json 500 error depending.
  res.status(err.status || 500).json(err)
}
