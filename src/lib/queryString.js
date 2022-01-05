const keyAndValueToString = objectEntry => {
  const [_key, value] = objectEntry

  if (!Array.isArray(value) && typeof value === 'object') {
    throw new Error('Please check your input, only primitive values are allowed')
  }

  return objectEntry.join('=')
}

const stringToKeyAndValue = query => {
  let [key, value] = query.split('=')

  if (value.includes(',')) {
    value = value.split(',')
  }

  return [key, value]
}

module.exports.queryString = obj => {
  const entries = Object.entries(obj)
  const mappedQueries = entries.map(keyAndValueToString)
  const queryString = mappedQueries.join('&')

  return queryString
}

module.exports.parse = string => {
  const queries = string.split('&')
  const objEntriesFromQueries = queries.map(stringToKeyAndValue)
  const parsedQueries = Object.fromEntries(objEntriesFromQueries)

  return parsedQueries
}
