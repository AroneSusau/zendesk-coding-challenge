'use-strict'

const fetch = require('node-fetch')
const fetchHeaders = require('fetch-headers')
const LoginCredentials = require('./LoginCredentials')
const ticket = require('./Ticket')
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
   * Login to Zendesk account using node-fetch with Basic Authentication, retriving Tickets,
   * split via pagination.
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
    if (!response.ok) {
      console.log('\x1b[31mAPI Request Issue..')
    }

    switch (response.status) {
      case 401:
        console.log(response.statusText, ": Couldn't authenticate you\x1b[0m")
        break
      case 404:
        console.log(response.statusText, ': Page not found\x1b[0m')
        break
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
      return new ticket(ticketObject)
    })
  }

  setUrlForAllTickets() {
    this.url = `https://aronesusau.zendesk.com/api/v2/tickets.json`
  }

  setUrlForSingleTicket(id) {
    this.url = `https://aronesusau.zendesk.com/api/v2/tickets/${id}.json`
  }
}

module.exports = HttpTicketRequest
