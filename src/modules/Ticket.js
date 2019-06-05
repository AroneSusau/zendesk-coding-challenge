'use-strict'

class Ticket {
  /**
   * Ticket Class
   *
   * @param {Object} object Ticket object retured from Zendesk tickets API.
   */
  constructor(object) {
    const objectType = typeof object
    object = objectType === 'object' ? object : {}
    this.id = object.id || 0
    this.subject = object.subject || 'None'
    this.description = object.description || 'None'
    this.requesterId = object.requester_id || 0
  }

  /**
   * Returns summary details for Ticket as a string.
   */
  toStringSummary() {
    const id = '\x1b[2m' + this.id

    const subjectGap = 5 - this.id.toString().length
    const subject = ''.padStart(subjectGap, ' ') + this.subject

    const descriptionGap = 50 - this.subject.length
    const description =
      ''.padStart(descriptionGap, ' ') + this.description.substr(0, 50).trim()

    return id + subject + description + '...\x1b[0m'
  }

  /**
   * Returns all details for Ticket as a string.
   */
  toStringAllDetails() {
    return (
      'Requester: ' +
      this.id +
      '\nId: ' +
      this.requesterId +
      '\nSubject: ' +
      this.subject +
      '\n\n' +
      this.description
    )
  }
}

module.exports = Ticket
