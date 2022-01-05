module.exports.queryString = (obj) => {
    const entries = Object.entries(obj)
    const mappedQueries = entries.map(entry => entry.join('='))
    const queryString = mappedQueries.join('&')

    return queryString
}