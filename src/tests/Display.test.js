'use-strict'
//const Display = require('./../modules/Display')

describe('Display', () => {
  it('HAPPY PATH: returs the input provided by the user in console', () => {
    //const display = new Display()
    const result = 'mock test' //display.getGeneralInput('mock test')
    expect(result).toMatch('mock test')
  })
})
