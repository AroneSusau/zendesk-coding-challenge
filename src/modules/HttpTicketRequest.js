'use-strict'

const fetch = require('node-fetch')
const fetchHeaders = require('fetch-headers')
const LoginCredentials = require('./LoginCredentials')
const Ticket = require('./Ticket')
const console = require('console')

class HttpTicketRequest {
  /**
   * HttpTicketRequest Class
   */
  constructor() {
    this.headers = null
    this.login = null
    this.url = ''
  }

  /**
   * Basic fetch request to Zendesk API using Basic Authentication.
   *
   * @returns {Promise} Returns Promise from fetch request.
   */
  async fetchZendeskTickets() {
    return fetch(this.url, { headers: this.headers })
      .then(this.handlesErrors)
      .then(result => result.json())
      .catch(err => {
        console.log(err)
      })
  }

  /**
   * Basic error handling for the fetch request to the Zendesk API.
   *
   * @param {Object} response Response returned from fetch request to the Zendesk API.
   */
  handlesErrors(response) {
    if (!response.ok && process.env.NODE_ENV !== 'test') {
      console.log('\x1b[31mAPI Request Issue..')
      switch (response.status) {
        case 401:
          console.log(response.statusText, ": Couldn't authenticate you\x1b[0m")
          break
        case 404:
          console.log(response.statusText, ': Ticket not found\x1b[0m')
          break
        case 400:
          console.log(response.statusText, ': Invalid Ticket Id\x1b[0m')
          break
        default:
          console.log(response.statusText, '\x1b[0m')
      }
    }

    return response
  }

  /**
   * Sets login credentials and authorisation header option.
   *
   * @param {String} username Zendesk account username.
   * @param {String} password Zendesk account password.
   */
  setLoginCredentialsAndHeaders(username, password) {
    this.login = new LoginCredentials(username, password)
    this.headers = new fetchHeaders()
    this.headers.append('Authorization', 'Basic ' + this.login.base64)
    this.headers.append('method', 'POST')
  }

  /**
   * Passes current ticket list and returns Ticket object with
   * nessacary data.
   *
   * @param {Array} ticketsList Tickets list retrived from Zendesk API.
   * @returns {Array} Returns array with Ticket objects.
   */
  formatTickets(ticketsList) {
    return ticketsList.map(ticketObject => {
      return new Ticket(ticketObject)
    })
  }

  /**
   * Makes fetch request to Zendesk API for tickets
   *
   * @param {Boolean} isRequestingMultiple Flag to check if the request is for multiple tickets or a single ticket
   * @param {number} ticketId Sets the id for the requested ticket if the isMulti flag is true.
   *
   * @returns {Mixed} Returns a single ticket object or the full tickets list depending on the isMulti flag.
   */
  async retriveTickets(isRequestingMultiple, ticketId) {
    isRequestingMultiple
      ? this.setUrlForAllTickets()
      : this.setUrlForSingleTicket(ticketId)
    let apiResponse = await this.fetchZendeskTickets()
    return isRequestingMultiple ? apiResponse.tickets : new Ticket(apiResponse.ticket)
  }

  /**
   * Sets the url to retrive all tickets from the Zendesk API.
   */
  setUrlForAllTickets() {
    this.url = `https://aronesusau.zendesk.com/api/v2/tickets.json`
  }

  /**
   * Sets the url to retrive a single ticket by its id from the Zendesk API.
   *
   * @param {number} id Id of ticket to be requested.
   */
  setUrlForSingleTicket(id) {
    this.url = `https://aronesusau.zendesk.com/api/v2/tickets/${id}.json`
  }
}

module.exports = HttpTicketRequest
