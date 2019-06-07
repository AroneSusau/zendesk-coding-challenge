'use-strict'
const fetch = require('node-fetch')
const fetchHeaders = require('fetch-headers')
const Ticket = require('../Ticket/Ticket')
const console = require('console')
// Disables debug output in testing environment
console.log = process.env.NODE_ENV != 'test' ? console.log : function() {}

class HttpTicketRequest {
  /**
   * HttpTicketRequest Class
   */
  constructor(username, password) {
    this.login = Buffer.from(username + ':' + password).toString('base64')
    this.headers = new fetchHeaders()
    this.headers.append('Authorization', 'Basic ' + this.login)
    this.headers.append('method', 'POST')
  }

  /**
   * Makes a fetch request to the Zendesk API for all tickets and uses closure to pass the next page url back to itself if there is one.
   *
   * @returns {Mixed} Returns a list of tickets from the Zendesk API or null if an error occurs.
   */
  async fetchAllTickets() {
    let url = 'https://aronesusau.zendesk.com/api/v2/tickets.json?per_page=25'
    let page = 0
    return async () => {
      if (url) {
        let apiResponse = await this.fetchRequest(url)
        if (apiResponse) {
          let result = this.formatTickets(apiResponse.tickets)
          url = apiResponse.next_page
          result.nextPage = apiResponse.next_page
          result.page = this.getPageNumberFromUrl(url)
          result.page = result.page === -1 ? ++page : result.page
          result.count = apiResponse.count
          page = result.page
          return result
        } else return null
      }
    }
  }

  /**
   * Fetch request to Zendesk API for a single tickets by its id.
   *
   * @param {Number} ticketId Id for ticket.
   * @returns {Mixed} Returns a list of tickets from the Zendesk API or null if an error occurs.
   */
  async fetchTicketById(ticketId) {
    let url = `https://aronesusau.zendesk.com/api/v2/tickets/${ticketId}.json`
    let apiResponse = await this.fetchRequest(url)
    return apiResponse ? new Ticket(apiResponse.ticket) : null
  }

  /**
   * Template fetch request.
   *
   * @returns {Promise} Returns Promise from fetch request.
   */
  async fetchRequest(url) {
    return fetch(url, { headers: this.headers })
      .then(this.handlesErrors)
      .then(response => response.json())
      .then(response => (response.error ? null : response))
      .catch(error => console.log(error))
  }

  /**
   * Basic error handling for the fetch request to the Zendesk API.
   *
   * @param {Object} response Response returned from fetch request to the Zendesk API.
   */
  handlesErrors(response) {
    if (!response.ok) {
      console.log('\x1b[31mAPI Request Issue..')
      switch (response.status) {
        case 401:
          throw response.statusText + ": Couldn't authenticate you\x1b[0m"
        case 404:
          throw response.statusText + ': Ticket not found\x1b[0m'
        case 400:
          throw response.statusText + ': Invalid Ticket Id\x1b[0m'
        default:
          throw response.statusText + '\x1b[0m'
      }
    }

    return response
  }

  /**
   * Uses a regex search function to find and return the current page number from URL.
   *
   * @returns {String} Page number of the current URL.
   */
  getPageNumberFromUrl(url) {
    return url ? --url.match(/\?page=[0-9]*[0-9]/g)[0].split('=')[1] : -1
  }

  /**
   * Formats a list of tickets retrieved from the Zendesk API into the Ticket data model.
   *
   * @param {Array} ticketsList Tickets list retrieved from Zendesk API.
   * @returns {Array} Returns array with Ticket objects.
   */
  formatTickets(ticketsList) {
    return ticketsList.map(ticketObject => {
      return new Ticket(ticketObject)
    })
  }
}

module.exports = HttpTicketRequest
