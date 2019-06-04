'use-strict'

const fetch = require('node-fetch')
const fetchHeaders = require('fetch-headers')
const LoginCredentials = require('./LoginCredentials')
const Ticket = require('./Ticket')

class HttpTicketsRequest {
	/**
	 * Login to Zendesk account using node-fetch GET with Basic Authentication, retriving Tickets,
	 * split via pagination.
	 *
	 * @returns {Promise} Returns Promise from fetch request.
	 */
	async fetchZendeskTickets() {
		this.url = `https://aronesusau.zendesk.com/api/v2/tickets.json`
		return fetch(this.url, { headers: this.headers }).then(result => result.json())
	}

	/**
	 * Sets login credentials and authorisation header option.
	 *
	 * @param {String} username Zendesk account username.
	 * @param {String} password Zendesk account password.
	 */
	setLoginCredentials(username, password) {
		this.login = new LoginCredentials(username, password)
		this.headers = new fetchHeaders()
		this.headers.append('Authorization', 'Basic ' + this.login.base64)
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
}

module.exports = HttpTicketsRequest
