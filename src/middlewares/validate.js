const validateTitle = (request, response, next) => {
  const { body } = request
  const { headers } = request
  if (body.title === undefined) {
    return response.status(400).json({ message: 'Title is required!' })
  }
  if (body.title === '') {
    return response.status(400).json({ message: 'Title cannot be empty!' })
  }
  if (headers.user.id === undefined) {
    return response.status(400).json({ message: 'ID is required!' })
  }
  if (headers.user.id === '') {
    return response.status(400).json({ message: 'ID cannot be empty!' })
  }
  next()
}

const validateStatus = (request, response, next) => {
  const { body } = request
  if (body.status === undefined) {
    return response.status(400).json({ message: 'Status is required!' })
  }
  if (body.status === '') {
    return response.status(400).json({ message: 'Status cannot be empty!' })
  }
  next()
}

const validateId = (request, response, next) => {
  const { params } = request
  params.id = params.id.replace(/\s/g, '')
  if (!Number(params.id)) {
    return response.status(400).json({ message: 'Invalid ID!' })
  }
  next()
}

const validateUser = (request, response, next) => {
  const { body } = request
  if (body.real_name === undefined) {
    return response.status(400).json({ message: 'Real name is required!' })
  }
  if (body.real_name === '') {
    return response.status(400).json({ message: 'Real name cannot be empty!' })
  }
  if (body.username === undefined) {
    return response.status(400).json({ message: 'Username is required!' })
  }
  if (body.username === '') {
    return response.status(400).json({ message: 'Username cannot be empty!' })
  }
  if (body.phone === undefined) {
    return response.status(400).json({ message: 'Phone is required!' })
  }
  if (body.phone === '') {
    return response.status(400).json({ message: 'Phone cannot be empty!' })
  }
  if (body.email === undefined) {
    return response.status(400).json({ message: 'Email is required!' })
  }
  if (body.email === '') {
    return response.status(400).json({ message: 'Email cannot be empty!' })
  }
  if (body.user_password === undefined) {
    return response.status(400).json({ message: 'Password is required!' })
  }
  if (body.user_password === '') {
    return response.status(400).json({ message: 'Password cannot be empty!' })
  }
  next()
}

module.exports = {
  validateTitle,
  validateStatus,
  validateId,
  validateUser,
}
