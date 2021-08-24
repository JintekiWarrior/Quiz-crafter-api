// Error for ownership - someone doesnt own a resource
class OwnershipError extends Error {
  constructor () {
    super()
    this.name = 'OwnershipError'
    this.message = 'You do not own this resource'
  }
}

// Error for missing invalid incoming data
class BadParamsError extends Error {
  constructor () {
    super()
    this.name = 'BadParamsError'
    this.message = 'A required parameter was missing or invalid'
  }
}

// Bad credentials error - provided the wrong email or password
class BadCredentialsError extends Error {
  constructor () {
    super()
    this.name = 'BadCredentialsError'
    this.message = 'Email or Password was incorrect'
  }
}

// Document not found error
class DocumentNotFoundError extends Error {
  constructor () {
    super()
    this.name = 'DocumentNotFoundError'
    this.message = 'Could not locate the document'
  }
}

// handle404 method will check if the incoming document exists or not
const handle404 = (doc) => {
  if (!doc) {
    throw new DocumentNotFoundError()
  }

  return doc
}

// requireOwnership function will compare the user making a request against
// the owner of the resource accessed.
const requireOwnership = (req, doc) => {
  // Locate the owners id for the document
  const owner = doc.owner._id ? doc.owner._id : doc.owner

  // Compare the owner ID against the request user's ID, if it doesn't match
  // we throw an error
  if (!req.user._id.equals(owner)) {
    throw new OwnershipError()
  }
  // if everything is fine we return the document
  return doc
}
