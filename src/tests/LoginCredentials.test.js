const LoginCredentials = require('./../modules/LoginCredentials')

describe('LoginCredentials', () => {
  it('should return an object of type LoginCredentials', () => {
    const mockLoginCredentials = new LoginCredentials('', '')
    expect(mockLoginCredentials instanceof LoginCredentials).toBe(true)
  })
})
