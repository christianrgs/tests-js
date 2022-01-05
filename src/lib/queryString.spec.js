const { queryString, parse } = require('./queryString')

describe('Object to query string', () => {
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

describe('Query string to object', () => {
  it('should convert a query string into object', () => {
    const qs = 'name=christian&profession=developer'

    expect(parse(qs)).toEqual({ name: 'christian', profession: 'developer' })
  })

  it('should convert a query string of a single key-value pair into object', () => {
    const qs = 'name=christian'

    expect(parse(qs)).toEqual({ name: 'christian' })
  })

  it('should convert a query string into object taking care of comma separated values', () => {
    const qs = 'name=christian&abilities=JS,TS'

    expect(parse(qs)).toEqual({ name: 'christian', abilities: ['JS', 'TS'] })
  })
})
