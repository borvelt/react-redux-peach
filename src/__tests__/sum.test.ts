import sum from '../sum'

describe('test sum function', () => {
  it('should return 5', () => {
    expect(sum(2, 3)).toEqual(5)
  })
})
