const { sum } = require('./calculator')

it('should sum 2 to 2 and the result must be 4', () => {
    expect(sum(2, 2)).toBe(4)
})

it('should be sum 2 to 2 even if one of them is a string and the result must be 4', () => {
    expect(sum('2', '2')).toBe(4)
})

it('should throw an error if it has no parameters or if one of the parameters supplied to the method cannot be summed', () => {
    expect(() => {
        sum('', '2')
    }).toThrowError()

    expect(() => {
        sum([2, 2])
    }).toThrowError()

    expect(() => {
        sum()
    }).toThrowError()
})