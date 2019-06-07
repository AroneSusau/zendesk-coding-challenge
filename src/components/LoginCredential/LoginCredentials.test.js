'use-strict'
const LoginCredentials = require('./LoginCredentials')

describe('LoginCredentials', () => {
  it('HAPPY PATH: should return the exact string passed to it for username', () => {
    expect(new LoginCredentials('mock', 'mock').username).toMatch('mock')
  })

  it('HAPPY PATH: should return the exact string passed to it for password', () => {
    expect(new LoginCredentials('mock', 'mock').password).toMatch('mock')
  })

  it('should return a username that is an empty string when passed an argument that is not of type string', () => {
    expect(new LoginCredentials(123, 'Hello world').username).toMatch('')
    expect(new LoginCredentials({ mock: 'mock' }, 'Hello world').username).toMatch('')
    expect(new LoginCredentials(null, 'Hello world').username).toMatch('')
    expect(new LoginCredentials(undefined, 'Hello world').username).toMatch('')
    expect(new LoginCredentials(new Array(1, 2, 3), 'Hello world').username).toMatch('')
    expect(new LoginCredentials(() => {}, 'Hello world').username).toMatch('')
    expect(new LoginCredentials(function() {}, 'Hello world').username).toMatch('')
  })

  it('should return a password that is an empty string when passed an argument that is not of type string', () => {
    expect(new LoginCredentials('Hello world', 123).password).toMatch('')
    expect(new LoginCredentials('Hello world', { mock: 'mock' }).password).toMatch('')
    expect(new LoginCredentials('Hello world', null).password).toMatch('')
    expect(new LoginCredentials('Hello world', undefined).password).toMatch('')
    expect(new LoginCredentials('Hello world', new Array(1, 2, 3)).password).toMatch('')
    expect(new LoginCredentials('Hello world', () => {}).password).toMatch('')
    expect(new LoginCredentials('Hello world', function() {}).password).toMatch('')
  })
})
