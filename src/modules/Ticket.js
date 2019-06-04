'use-strict'

class Ticket {
	/**
	 * Ticket Class
	 *
	 * @param {Object} object Ticket object retured from Zendesk tickets API.
	 */
	constructor(object) {
		this.id = object.id || 0
		this.subject = object.subject || 'None'
		this.description = object.description || 'None'
		this.requesterId = object.requester_id || 'None'
	}

	/**
	 * Returns summary details for Ticket as a string.
	 */
	toStringReduced() {
		return (
			'Id: ' +
			this.id +
			' - Subject: ' +
			this.subject +
			' - Description: ' +
			this.description.trim().substr(0, 20) +
			'...'
		)
	}

	/**
	 * Returns all details for Ticket as a string.
	 */
	toStringFull() {
		return (
			'Rquester: ' +
			this.id +
			'Id: ' +
			this.requesterId +
			'Subject: ' +
			this.subject +
			'\n\n' +
			this.description
		)
	}
}

module.exports = Ticket
