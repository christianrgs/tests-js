const keyAndValueToString = objectEntry => {
  const [_key, value] = objectEntry

  if (!Array.isArray(value) && typeof value === 'object') {
    throw new Error('Please check your input, only primitive values are allowed')
  }

  return objectEntry.join('=')
}

module.exports.queryString = obj => {
  const entries = Object.entries(obj)
  const mappedQueries = entries.map(keyAndValueToString)
  const queryString = mappedQueries.join('&')

  return queryString
}
