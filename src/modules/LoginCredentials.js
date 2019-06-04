'use-strict'

class LoginCredentials {
  /**
   * LoginCredentials Class
   *
   * @param {String} username Client username.
   * @param {String} password Client password.
   */
  constructor(username, password) {
    this.username = username
    this.password = password
    this.base64 = Buffer.from(this.username + ':' + this.password).toString('base64')
  }
}

module.exports = LoginCredentials
