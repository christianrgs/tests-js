const { queryString } = require('./queryString')

describe('Object to query string', () => {
  it('should create a valid query string when the object in the parameter is valid', () => {
    const obj = {
      name: 'christian',
      profession: 'developer'
    }

    expect(queryString(obj)).toBe('name=christian&profession=developer')
  })
})
