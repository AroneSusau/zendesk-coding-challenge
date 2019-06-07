'use-strict'

class LoginCredentials {
  /**
   * LoginCredentials Class
   *
   * @param {String} username Client username.
   * @param {String} password Client password.
   */
  constructor(username, password) {
    username = typeof username == 'string' ? username : ''
    password = typeof password == 'string' ? password : ''
    this.username = username
    this.password = password
    this.base64 = Buffer.from(username + ':' + password).toString('base64')
  }
}

module.exports = LoginCredentials
