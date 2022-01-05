const { queryString } = require('./queryString')

describe('query string', () => {
  it('should create a valid query string when the object in the parameter is valid', () => {
    const obj = {
      name: 'christian',
      profession: 'developer'
    }

    expect(queryString(obj)).toBe('name=christian&profession=developer')
  })

  it('should create a valid query string when an array is the value of param', () => {
    const obj = {
      name: 'christian',
      abilities: ['JS', 'TS']
    }

    expect(queryString(obj)).toBe('name=christian&abilities=JS,TS')
  })

  it('should throw an error when an object is passed in the value of param', () => {
    const obj = {
      name: 'christian',
      abilities: {
        first: 'JS',
        second: 'TS'
      }
    }

    expect(() => {
      queryString(obj)
    }).toThrowError()
  })
})
